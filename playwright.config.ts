import { defineConfig, devices } from "@playwright/test";

/**
 * Porta do dev server durante o e2e.
 *
 * Parametrizada porque `reuseExistingServer` reaproveita QUALQUER servidor que
 * já esteja na porta — sem checar de quem é. Com a 5173 ocupada por outro
 * projeto (um dev server do PettoFlow, por exemplo), a suíte inteira rodava
 * contra o app errado e os 39 testes falhavam sem que nada estivesse quebrado
 * no Speeedy. Com --strictPort o vite também deixa de cair em silêncio para a
 * 5174, que criaria o mesmo descasamento de porta.
 *
 *   E2E_PORT=5199 pnpm e2e
 */
const PORT = Number(process.env.E2E_PORT ?? 5173);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : 1,
	reporter: process.env.CI ? "github" : "list",
	use: {
		baseURL: BASE_URL,
		screenshot: "only-on-failure",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: `pnpm dev --port ${PORT} --strictPort`,
		url: BASE_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 30_000,
	},
});
