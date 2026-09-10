# Tarefa: internacionalizar o Speeedy para pt-BR (padrão) mantendo en

Você trabalha em `/root/Speeedy-i18n` (worktree, branch `feat/ptbr-i18n`).
O núcleo de i18n **já existe e está commitado** — não o reescreva.

## API disponível (não altere estes arquivos)

- `src/i18n/index.ts` — `t(key, vars?)`, `tDynamic`, `getLocale()`, `setLocale()`, `detectLocale()`, `onLocaleChange()`, `LOCALES`, `DEFAULT_LOCALE` (`"pt-BR"`), `LOCALE_LABELS`.
- `src/i18n/controller.ts` — `LocaleController`, o binding de Lit (re-render automático).
- `src/i18n/locales/en.ts` — catálogo **canônico**: define o formato. `Messages = typeof en`.
- `src/i18n/locales/pt-BR.ts` — tipado como `Messages`.
- `src/models/types.ts` — já tem `UserProfile.locale?: Locale`.

Uso em componente Lit:

```ts
import { LocaleController } from "../i18n/controller.js";

export class Foo extends LitElement {
	private i18n = new LocaleController(this);

	override render() {
		return html`<button title=${this.i18n.t("common.close")}>${this.i18n.t("common.close")}</button>`;
	}
}
```

Regras de chave:

- `t()` é **tipado por dot-path**: só compila se a chave existir em `en.ts`. Erro de digitação = erro de build.
- Toda chave nova entra **nos dois** catálogos, com o mesmo caminho: `en.ts` recebe o texto inglês atual (inalterado!) e `pt-BR.ts` recebe a tradução. `pt-BR.ts` é tipado como `Messages`, então chave faltando **quebra o `tsc`**.
- Interpolação: `"Progress: {percent}%"` + `t("reader.progress", { percent: 42 })`.
- **Nunca concatene fragmentos traduzidos.** Use placeholder.
- **Nunca coloque HTML dentro de string do catálogo.** Se o texto atual tem markup inline (ex.: `or paste your own text. <a href="#/benchmark">Find your WPM →</a>`), separe em chaves ao redor do markup e mantenha o `<a>` no template.
- Namespaces já definidos no cabeçalho de `en.ts` (`common`, `shell`, `landing`, `app`, `reader`, `settings`, `profile`, `stats`, `bench`, `wellness`, `onboarding`, `learn`, `donate`, `promote`, `changelog`, `legal`, `share`, `feedback`, `errors`). Use-os; crie sub-namespaces claros quando precisar.
- Formatação de número/data: use `Intl.NumberFormat` / `Intl.DateTimeFormat` com `getLocale()`.

## Voz da tradução (pt-BR)

- Tratamento por **`você`** (3ª pessoa), vocabulário brasileiro, direto e operacional.
- Termos de produto permanecem reconhecíveis: **RSVP, ORP, WPM, PDF, EPUB, PWA**.
- Nada de tradução literal robótica em copy de marketing: **localize** (reescreva) mantendo as afirmações verdadeiras. **Não invente features.**
- Consistência: monte a tabela de termos antes de traduzir e siga-a (ex.: "flash" → "flash", "chunk" → "bloco", "streak" → "sequência", "reading session" → "sessão de leitura", "pause" de leitura ≠ "pause" de mídia).

## Fase 1 — UI interativa (faça primeiro, commite, verifique)

Arquivos: `src/components/app-page.ts`, `settings-panel.ts`, `rsvp-reader.ts`, `onboarding-modal.ts`, `wellness-overlay.ts`, `stats-dashboard.ts`, `feedback-modal.ts`, `profile-page.ts`, `share-view.ts`, `benchmark-test.ts`, `start-preview-dialog.ts`, `app-shell.ts`, `src/services/donation-service.ts`, `src/utils/events.ts` (só strings visíveis ao usuário — cuidado: aqui há toasts).

Atenção em `app-shell.ts`: `handleUnhandledRejection` deve usar `t("shell.unexpectedError")`; o título `"Shared Reading"` deve usar `t("shell.sharedReadingTitle")`.

Bug conhecido a corrigir junto: em `app-shell.ts` a string `Link não abre` — use `t("shell.badReadLink")` no catch do `read/` (hoje só há `console.error`).

## Fase 2 — Páginas de conteúdo (localização de copy, não tradução literal)

Arquivos: `marketing-page.ts`, `learn-page.ts`, `donate-page.ts`, `promote-page.ts`, `changelog-page.ts`, `legal-page.ts`.

- `changelog`: mantenha o histórico real; traduza os títulos/itens de UI. Não invente versões.
- `legal-page` (privacidade/termos): traduza o texto existente e **não** reescreva cláusulas. É tradução de texto do upstream; adicione no topo do bloco traduzido, em pt-BR, uma nota curta: conteúdo traduzido do original em inglês, sem valor de aconselhamento jurídico.

## Fase 3 — Conteúdo de teste de leitura + SEO

1. `src/data/benchmark-passages.ts`: mantenha as 6 passagens em inglês (ids `deep-ocean` etc.) **intactas** e adicione as 6 equivalentes em **português**, com:
   - mesmo `id` + sufixo de locale, ou um campo `locale` no objeto — escolha e documente;
   - `wordCount` **correto** para o texto pt-BR (conte de fato; o WPM depende disso);
   - mesmo número de `questions`, com `q`/`options` traduzidos e `correct` apontando para a alternativa certa;
   - dificuldade equivalente e tema igual ao original.
   - Garanta que o benchmark seleciona a passagem do locale ativo (e faz fallback para `en`).
2. `index.html`: `lang="pt-BR"`, `<title>`, `meta description`, `og:*` em pt-BR. **`<link rel="canonical">` e `og:url` devem apontar para `https://speeedy-2vc.pages.dev/`** (hoje apontam para `speeedy.pages.dev`, que é de outra conta).
3. `src/config.ts`: `SITE_URL` deve ser `https://speeedy-2vc.pages.dev`.

## Fase 4 — Testes e2e

Os 28 seletores por texto/role estão em inglês. O app agora sai em pt-BR por padrão, então:

- Atualize os seletores para os **textos em pt-BR** (é o que o usuário vê).
- Adicione `e2e/locale.spec.ts`: verifica que o app carrega em pt-BR, que trocar para `en` muda a UI e que a escolha persiste após reload (`localStorage["speeedy:locale"]`), e que `?lang=en` força o inglês.
- NÃO altere os fixtures de texto em inglês dos testes unitários (`src/**/*.test.ts`) — eles testam lógica, não copy.

## Regras duras

- **NÃO** toque em: `src/i18n/index.ts`, `src/i18n/controller.ts`, `src/models/types.ts`, `src/services/rsvp-engine.ts`, `text-parser.ts` (lógica), `vitest.config.ts`, `vite.config.ts`, `wrangler.toml`, `.github/**`, `package.json` (não adicione dependências — i18n é zero-dep).
- Não adicione biblioteca de i18n. Não use `eval`. Não use `innerHTML` com string traduzida.
- Nada de `as any` / `@ts-ignore`.
- Rode e faça passar, a cada fase: `npx tsc --noEmit`, `pnpm lint`, `pnpm test`, `pnpm build`. A fase só está concluída se os quatro passarem.
- `pnpm` precisa de `export PATH="/root/.npm-global/bin:$PATH"`.
- e2e: `pnpm e2e` (Chromium já instalado). Se algum spec falhar por motivo anterior à sua mudança, reporte — não mascare.
- Commite **uma vez por fase**, mensagem em inglês no padrão conventional commits (`feat(i18n): ...`). Não faça push.

## Relatório final (obrigatório)

Imprima ao final, em texto simples:

1. Fases concluídas e o hash de cada commit.
2. Nº de chaves adicionadas por namespace.
3. Saída real de `npx tsc --noEmit`, `pnpm lint`, `pnpm test`, `pnpm build` (últimas linhas de cada).
4. Resultado do `pnpm e2e`.
5. Qualquer string que você **não** traduziu e por quê.
6. Divergências que encontrou no código (ex.: string que parecia não-UI, ou chave duplicada).
