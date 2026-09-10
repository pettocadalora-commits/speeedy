# i18n pt-BR — trabalho restante (mapa auditado)

Estado em 2026-09-10 17:25 UTC, branch `feat/ptbr-i18n` (worktree `/root/Speeedy-i18n`),
HEAD `b1dda4f`. Baseline verificado: `tsc` exit 0, 160/160 testes, `pnpm build` OK.

Este arquivo existe porque as tentativas anteriores produziram relatórios falsos
(ver "Modos de falha" no fim). A lista abaixo foi levantada por auditoria
determinística (`/tmp/audit-i18n.py`), com o trecho de código citado como prova.

## Como auditar de novo

```
cd /root/Speeedy-i18n && python3 /tmp/audit-i18n.py
```

Colunas: `t()` = quantas chamadas de tradução o arquivo já tem; `i18n` = usa
`LocaleController`/`t()`; `prosa` = suspeitas de string em inglês (inclui falsos
positivos de CSS — conferir o detalhe).

## 1. Concluído (17 arquivos)

`app-shell`, `profile-page`, `app-page`, `settings-panel`, `rsvp-reader`,
`onboarding-modal`, `wellness-overlay`, `stats-dashboard`, `feedback-modal`,
`share-view`, `benchmark-test` (só as strings — ver item 4), `start-preview-dialog`,
`marketing-page`, `learn-page`, `donation-service`, `legal-page` (só parcialmente),
`toast-container`.

O seletor de idioma já existe em `profile-page.ts` (`LOCALE_LABELS[locale]`).

## 2. Ainda NÃO traduzido — componentes

Evidência = linha citada do arquivo. Estes nunca foram tocados por um motor vivo
(v1/v2/v3 travaram antes; os "SEM_STRINGS" que aparecem no log do driver v3 são
falsos — o Codex estava sem cota, ver item 5).

| arquivo | strings visíveis (evidência) |
|---|---|
| `src/components/changelog-page.ts` | ~47 ocorrências. L22: "Words per flash control — configure how many words appear in each RSVP flash (1–5)." Manter o histórico REAL de versões; traduzir só títulos/itens. |
| `src/components/donate-page.ts` | ~24 ocorrências. |
| `src/components/promote-page.ts` | ~8 ocorrências. |
| `src/components/legal-page.ts` | L16: "Privacy Policy" + demais títulos/corpo. Traduzir o texto do upstream sem reescrever cláusulas e adicionar nota de que é tradução, sem valor de aconselhamento jurídico. |
| `src/components/donation-banner.ts` | L50: "You've saved ~${...} reading with Speeedy. Support the dev →" · L52: "Speeedy is built solo, ad-free. Support the dev →" |
| `src/components/share-card.ts` | L84: "Words Read" · L85: "Time Spent" · L86: "Day Streak" |
| `src/components/hero-rsvp-demo.ts` | L8: "Words appear one at a time. Your eyes stay still. No distractions." · L81: "Live RSVP demo — words shown one at a time at the pivot point" · L109: "Play demo" / "Pause demo" |
| `src/components/orp-demo.ts` | L19: "hover any word" |

Sem strings visíveis (confirmado — só CSS/sintaxe): `global-tooltip.ts`,
`github-star-prompt.ts`.

## 3. Ainda NÃO traduzido — mensagens de erro em serviços

Lacuna que a task original não listou, mas o usuário vê. O namespace `errors`
já existe nos catálogos.

- `src/services/text-parser.ts` — 11 mensagens, todas visíveis:
  L16 "Could not load the file parser. Please refresh the page and try again." ·
  L97 "Unsupported ZIP content. Only EPUB books in ZIP format are supported." ·
  L117 "Unsupported file type: .${ext}. Supported formats: PDF, DOCX, DOC, TXT, MD, E…" ·
  L229 "Could not extract text from this .doc file. Try saving it as .docx or .txt first." ·
  L250 "Could not extract text from this RTF file. Try saving it as .txt or .docx." ·
  L317 "Could not open ODT file as a valid archive." ·
  L321 "Invalid ODT: content.xml not found." ·
  L338 "Could not open file as a valid archive." ·
  L343 "Invalid EPUB: No content manifest (OPF) found." ·
  L370 "EPUB appears to be empty or encrypted (DRM protected)."
- `src/services/storage-service.ts` — L95 "Invalid profile data."
- Revisar individualmente: `services/stats-service.ts`, `services/defaults.ts`,
  `services/profile-service.ts`, `utils/text-utils.ts` (L40 `"${m} min"` — provavelmente ok).

## 4. Integração pendente (bug, não tradução)

`src/components/benchmark-test.ts` está traduzido, mas **ainda com dois defeitos**:

1. **Passagens pt-BR inalcançáveis.** O arquivo usa `pickPassage()` (L5, L31, L76),
   que só devolve o array inglês. `getBenchmarkPassages(locale)` existe em
   `src/data/benchmark-passages.ts` mas **não é chamada por ninguém**. Trocar por
   `getBenchmarkPassages(getLocale())` e reagir a `onLocaleChange`.
2. **WPM inflado no inglês.** L51 usa `this.passage.wordCount` como denominador.
   Os `wordCount` das 5 passagens INGLESAS (herdadas do upstream) estão errados —
   medidos com o tokenizador real do app:

   | id | declarado | real | desvio |
   |---|---|---|---|
   | deep-ocean | 311 | 305 | +2,0% |
   | sleep-science | 308 | 291 | +5,8% |
   | urban-forests | 302 | 297 | +1,7% |
   | invention-writing | 305 | 303 | +0,7% |
   | microbiome | 299 | 294 | +1,7% |

   As passagens pt-BR estão exatas (318/338/336/347/324).

   **Corrigir o consumo, não o dado:** usar `tokenize(this.passage.text).length`
   de `../services/rsvp-engine.js` como denominador e no rótulo de tamanho.
   Não editar `src/data/benchmark-passages.ts` — o bloco inglês deve permanecer
   byte a byte igual ao upstream, para o merge futuro não conflitar.

   Medir de novo com:
   ```
   cd /root/Speeedy && npx vite-node /tmp/verify-bench.mjs
   ```

## 5. Modos de falha já observados (não repetir)

1. **Um Codex de contexto longo para 26 arquivos** → esgota e encerra sem commitar
   (parou em 6/26). Usar **um Codex por arquivo**.
2. **Dois drivers no mesmo worktree** → ambos escrevem nos mesmos catálogos e um
   usava `git add -A src`. Usar `flock` e `git add` só de caminhos explícitos.
3. **`git status` como prova de trabalho** → a modificação espúria de
   `pnpm-lock.yaml` fez o v1 reportar "22 ok / 0 com problema" sem ter feito nada.
   Provar progresso por **SHA novo**, nunca por `git status`.
4. **Motor sem cota lido como "nada a fazer"** → o v3 reportou `SEM_STRINGS` nos 16
   arquivos enquanto o Codex respondia só `You've hit your usage limit`.
   **Sempre ler o log do motor** antes de concluir qualquer coisa.
5. **Critério impossível de "fase completa antes do commit"** → faz o driver parar
   em vez de acumular. Commitar por arquivo.

## 6. Próximo passo

Driver pronto e endurecido: `/tmp/i18n-driver3.sh` (flock, `git add` restrito,
verificação por SHA, detecção de motor morto). Ele aborta com `exit 2` se o motor
não tiver cota. Reprocessar a lista dos itens 2 e 3 quando houver motor vivo.
