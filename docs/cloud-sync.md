# Speeedy — Cloud Sync sem conta (F1 revisada)

> Substitui a F1 original de `docs/evolucao.md` (Supabase + contas + RLS).
> Decisão: **2026-09-10**, após revisão de arquitetura com o dono do fork.

## Por que mudou

A F1 original criava `profiles`, `documents`, auth (Google+email) e RLS no
Postgres. Isso quebrava a promessa central do produto — _local-first, sem conta,
sem coleta de dados_ — e adicionava a maior divergência possível em relação ao
upstream. O objetivo real do dono é **continuar a leitura entre iPhone, iPad e
desktop**. Para isso não é preciso conta, identidade nem banco relacional: é
preciso um cofre de blobs cifrados com um par de dispositivos.

## Modelo

- **Sem conta, sem e-mail, sem PII.** Não existe usuário no servidor.
- **Par de dispositivos por código.** O dispositivo A gera um código
  `sp1.<syncId>.<syncKey>`; o dispositivo B digita o código e passa a
  compartilhar o mesmo cofre.
- **Criptografia no cliente.** O servidor recebe e devolve **apenas
  ciphertext**. `syncKey` (256 bits, aleatório) nunca sai do dispositivo.
  AES-GCM via WebCrypto; IV aleatório de 12 bytes por push.
- **Servidor não consegue ler nada** — nem título de documento, nem estatística.
  Vazamento do KV = blobs opacos.
- **Perder o código = perder o cofre.** Não há recuperação, por design.
  A UI deve avisar isso de forma explícita e oferecer exportar o backup
  `.speeedy` como plano B (já existe).

## Protocolo

Armazenamento: **Cloudflare KV** (namespace `SPEEDY_SYNC`), chave = `syncId`.
Endpoint: **Pages Function** em `functions/api/sync.ts`, servida no mesmo
domínio do app (`speeedy-2vc.pages.dev/api/sync`) — sem CORS, sem custo de
Worker separado, e o `workers.dev` não está provisionado nesta conta.

| Método | Rota | Efeito |
|---|---|---|
| `PUT` | `/api/sync/<syncId>` | grava envelope; devolve `rev` (carimbo de escrita do servidor) |
| `GET` | `/api/sync/<syncId>` | devolve envelope + `rev`; `404` se não existe |
| `DELETE` | `/api/sync/<syncId>` | apaga o cofre (usado no "desconectar e apagar da nuvem") |

Envelope (o que fica no servidor):

```json
{ "v": 1, "iv": "<b64url 12B>", "ct": "<b64url ciphertext>", "rev": 7, "updatedAt": "2026-09-10T15:00:00Z" }
```

Conteúdo cifrado (snapshot JSON, nunca visível ao servidor):

```json
{
  "schema": 1,
  "deviceId": "<id local do dispositivo>",
  "profile": { "settings": {…}, "goals": {…} },
  "stats": { "totalWordsRead": 0, "totalTimeMs": 0, "currentStreak": 0, "bestStreak": 0, "lastReadDate": null },
  "docs": [
    { "hash": "<sha256 do texto>", "title": "…", "wordCount": 0, "resumeWordIndex": 0,
      "completionPercent": 0, "updatedAt": "…", "text": "<opcional, só se marcado p/ nuvem>" }
  ]
}
```

### Merge (sem conflito perceptível)

- **Perfil/settings:** campo a campo, vence o `updatedAt` mais recente.
- **Stats acumuladas:** monotônicas — `MAX()` por campo. Nunca regridem.
- **Documentos:** chave = `sha256(texto)` (mesma dedup local). Vence o
  `updatedAt` mais recente; `resumeWordIndex` acompanha o vencedor.
- **Texto do documento:** sobe só se o usuário marcar "salvar na nuvem" naquele
  item (opt-in por documento, como previsto). Limite: 2 MB de texto por doc
  (livros em texto puro ficam bem abaixo; acima disso, só metadados).
- **Sessões de leitura:** ficam **locais** (cap 500 no cliente). Só os agregados
  sobem.

### Controle de escrita

- `rev` é o carimbo de escrita do servidor (`Date.now()` no PUT, não um contador
  transacional — o KV não tem transação multi-operação). Serve para o cliente
  detectar que o remoto mudou desde o último pull: se `rev` remoto ≠ último
  `rev` conhecido, o cliente faz pull→merge→push em vez de sobrescrever.
- Rate limit simples por IP no KV (contador por minuto) para não virar vetor de
  abuso. Sem login, o `syncId` (16 bytes aleatórios) é a própria capability.

## Arquivos

| Arquivo | Ação |
|---|---|
| `functions/api/sync.ts` | novo — handler PUT/GET/DELETE + rate limit |
| `wrangler.toml` | adicionar binding `[[kv_namespaces]]` |
| `src/services/sync-crypto.ts` | novo — WebCrypto (AES-GCM, gerar/importar chave, código) |
| `src/services/sync-service.ts` | novo — push/pull/merge + fila local + `navigator.onLine` |
| `src/models/types.ts` | `SyncState`, `SyncEnvelope`, `CloudDocFlag` |
| `src/services/defaults.ts` | `cloudSyncEnabled: false`, `syncQueue: []` |
| `src/components/profile-page.ts` | seção "Sincronizar entre aparelhos" |
| `src/i18n/locales/*` | namespace `sync.*` nos dois catálogos |

## Fases

1. **Servidor** — Function + KV + teste de contrato com `curl` (PUT/GET/DELETE,
   rate limit, payload grande rejeitado). ✅ verificável sem UI.
2. **Cripto** — `sync-crypto.ts` + testes unitários (round-trip, IV único,
   código malformado rejeitado, chave errada falha).
3. **Serviço** — snapshot/merge + testes unitários de merge (stats monotônicas,
   doc mais recente vence, texto só quando marcado).
4. **UI** — seção de sync no perfil: gerar código, entrar com código, enviar,
   receber, status/última sincronização, "apagar da nuvem".

## Pitfall de deploy (descoberto 2026-09-10)

**`wrangler pages deploy` NÃO aplica bindings do `wrangler.toml`.** A primeira
versão publicada subiu sem KV e o endpoint respondeu `503 sync_unavailable` em
produção (o guard do handler pegou o problema). O binding precisa ser gravado na
**configuração do projeto Pages**:

```bash
PATCH /accounts/<acc>/pages/projects/speeedy
{ "deployment_configs": { "production": { "kv_namespaces":
  { "SPEEDY_SYNC": { "namespace_id": "<id>" } } }, "preview": { ... } } }
```

E o binding só passa a valer em **novo deploy** (bindings são resolvidos no
momento do deploy). O `wrangler.toml` continua necessário para `wrangler pages
dev` (KV local) — ou seja, **as duas fontes precisam concordar**.

## Riscos assumidos

- **Código perdido = dados irrecuperáveis.** Mitigação: aviso na UI + backup
  `.speeedy` recomendado.
- **KV eventualmente consistente** (até ~60s de propagação entre regiões).
  Aceitável: sync manual + pull sob demanda, não é colaboração em tempo real.
- **Sem E2E-cripto contra o servidor** (o servidor é cego por construção).
- **Divergência de fork:** `functions/` e `src/services/sync-*` são arquivos
  novos — conflito com upstream só se o upstream criar os mesmos caminhos.

## Fora de escopo (v1)

- Sincronizar binários originais (PDF/EPUB) — sobe só o texto já parseado.
- Sync em tempo real / presença.
- Recuperação de código perdido.
- Multi-usuário no mesmo cofre.
