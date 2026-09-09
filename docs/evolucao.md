# Speeedy — Plano de Evolução (Fork pettocadalora-commits)

> Documento de arquitetura das fases F1–F3. Decisões marcadas com **PENDENTE**
> exigem OK do usuário antes de criar recursos de nuvem.

## Contexto

Fork público de [sami-29/speeedy](https://github.com/sami-29/speeedy) (MIT),
local-first RSVP speed reader. Deploy: Cloudflare Pages → https://speeedy-2vc.pages.dev
(projeto `speeedy`; `speeedy.pages.dev` pertence ao upstream).

Fundação entregue:
- Fork + fix de build limpo (tsbuildinfo commitado mascarava erro de tipo real; corrigido, 160/160 testes).
- Auto-deploy GitHub Actions (`deploy-pages.yml`) com secrets CF configurados.
- pnpm 10.30.3 alinhado ao CI (nota: 18 OSV advisories — candidato a upgrade).

## Restrições de infraestrutura (Cloudflare, verificado 2026-08)

- Token CF: Workers/Pagess OK; **DNS read-only** (sem custom domain); **R2 indisponível**;
  **`workers.dev` não provisionado** (Pages não afetado).

---

## F1 — Cloud Sync (PENDENTE: stack)

### Decisão em aberto

| Opção | Prós | Contras |
|---|---|---|
| **A. Supabase (recomendado)** | Stack dominada (PettoFlow); auth Google+email pronta; Postgres + Storage; RLS nativo; ASVS L2 replicável | Novo projeto = custo/org; decisão de criação exige OK |
| B. Cloudflare Workers + D1 | Mesmo domínio pages.dev; sem provedor externo | Auth do zero (ASVS L2 custoso); R2 fora; workers.dev não provisionado |
| C. Sync por arquivo (WebDAV/export criptografado) | Zero backend; anonimato total | Não é "cloud sync" de verdade; UX pobre |

**Recomendação:** A — novo projeto Supabase sob a org existente, espelhando o
padrão de segurança já validado no PettoFlow (RLS + policies por `auth.uid()`).

### Modelo de dados proposto (Supabase)

- `profiles` (1:1 auth.users): `id uuid pk`, `display_name`, `avatar_emoji`,
  `avatar_image_url`, `created_at`, `updated_at`, payload JSONB de stats
  (`total_words_read`, `total_time_ms`, streaks, metas) — **sessões ficam no
  cliente** (500 cap local), stats agregados sobem.
- `documents`: `id uuid`, `owner_id uuid → auth.users`, `title`, `content_hash`
  (SHA-256, igual ao local), `word_count`, `text` (coluna `text` — livros até
  ~10 MB OK no Postgres; alternativa Storage bucket privado p/ >1 MB),
  `resume_word_index`, `completion_percent`, `updated_at`.
  - Unique `(owner_id, content_hash)` — espelha a dedup local.
- RLS: `owner_id = auth.uid()` em todas as tabelas. Service role só no servidor.

### Estratégia de sync (offline-first, sem conflito perceptível)

Princípio: **local-first permanece o source of truth em runtime**; a conta é
opt-in e aditiva.

1. Usuário cria conta (email+senha ou Google) dentro do app — sem sair do fluxo.
2. Primeiro login: *merge* por registro com `updated_at` (last-write-wins por
   documento; perfil = merge campo-a-campo de stats monotônicos com `MAX()`:
   words/time/streak nunca regridem).
3. Depois: fila de operações no IndexedDB (`sync_queue`) — toda mutação local
   grava `pending` com `updated_at`; worker de sync drena a fila quando online
   (pattern: `navigator.onLine` + `online` event + retry backoff).
4. Push: upsert de `documents` alterados + stats agregados. Pull: delta por
   `updated_at > last_pulled_at` (página de 100).
5. Resolução de conflito real (mesmo doc editado em 2 devices): LWW por
   `updated_at`, versão com diff preservada no `documents_history` (7 dias) —
   sem merge de texto (evitar corromper posição de leitura).
6. Privacidade: sync é **opt-in por doc** (toggle "salvar na nuvem" por item da
   biblioteca + perfil). Dados locais de quem não logou nunca saem do browser.
   Criptografia E2E fica fora de escopo v1 (HTTPS + RLS; documentar no privacy).

### Mudanças no código

- `src/models/types.ts`: `CloudSyncState`, `SyncQueueItem`, `AccountInfo`.
- `src/services/sync-service.ts` (novo): auth client (supabase-js) + fila + pull/push.
- `src/services/storage-service.ts`: ganchos `onMutate → enqueueSync`; separar
  stats agregadas (sobem) de sessions (ficam locais).
- `src/services/defaults.ts`: flags `cloudSyncEnabled: false`, `account: null`.
- UI: `settings-panel` + `profile-page` — seção Conta (login/logout, status
  sync, conflitos), badge de doc "na nuvem".
- Dependências novas: `@supabase/supabase-js` (lazy chunk próprio).
- Config via `src/config.ts` (URL + anon key expostas — padrão Supabase; RLS é a barreira).

---

## F2 — Browser Extension (MV3)

### Escopo v1 (recomendado)

- Chrome/Edge MV3, manifest v3, zero remote code.
- Selecionar texto em qualquer página → action icon → popup abre mini-reader
  RSVP com o texto selecionado (engine reusada).
- Leitura sem sair da aba; controls: Space (pause), ←/→ (seek), Esc (fechar).
- Settings persistidas em `chrome.storage.sync` (subset do `ReaderSettings`).

### Arquitetura

- **Pacote compartilhado** para o engine: hoje `rsvp-engine.ts` + `text-utils.ts`
  + `models/types.ts` + `defaults.ts` são puros (sem DOM no engine — já testado).
  Extrair para `packages/speeedy-core` (ou pasta `shared/` importada pelos dois
  builds: app Vite + extension). **Não duplicar engine.**
- Extension: `src-extension/` (Vite + `@crxjs/vite-plugin` ou build manual),
  content script NÃO injeta UI na página (somente extrai seleção via
  `chrome.scripting` no click da action); popup é HTML próprio isolado.
- Build: `pnpm build:extension` → `dist-extension/` (zip p/ store).
- Store: sideload dev primeiro; Chrome Web Store depois (decisão do usuário).

### Riscos

- pdfjs/mammoth/jszip **não entram** na extension v1 (só texto selecionado).
- i18n das páginas Web Store; política de privacidade (sem dados coletados —
  alinhado ao produto).

---

## F3 — Mobile wrapper

### Recomendação: **PWA first, wrapper só se métrica justificar**

O app já é PWA instalável (manifest + SW + offline). Antes de wrapper nativo:

1. Fechar gaps PWA: iOS (apple-touch-icon já existe; falta `apple-mobile-web-app-*`
   meta), share target API (`#/read/` já existe → Web Share Target para receber
   texto/links de outros apps), badge/notificações (Pomodoro), haptics.
2. Se wrapper necessário depois: **Capacitor** (Android + iOS de um codebase,
   mantém PWA como web), não TWA (Play exige conta dev + review). Capacitor
   permite acesso a FileSystem nativo (abrir PDFs de qualquer app) sem servidor.

### Escopo concreto (após F1/F2)

- Web Share Target (receber "share" de texto do navegador) — barato, alto valor.
- Teste em device real (Android Chrome) de PWA + service worker offline.
- Só então avaliar Capacitor.

---

## Ordem de execução

1. ~~F0 fundação~~ ✅
2. F1 cloud sync (precisa decisão stack + criação do projeto Supabase)
3. F2 extension (pode rodar em paralelo após extração do shared core — não depende de F1)
4. F3 PWA gaps + share target (independente; pode entrar no meio)
5. Auditoria final: testes, build limpo, deploy, docs, CHANGELOG

## Higiene / dívidas

- Upgrade pnpm (10.30.3 → 10.x patched) para eliminar OSV advisories.
- `browserslist` desatualizado (7 meses) — rodar `npx update-browserslist-db`.
- 11 warnings Biome pré-existentes — revisar.
- tsbuildinfo: já removido do git; `*.tsbuildinfo` no .gitignore.
