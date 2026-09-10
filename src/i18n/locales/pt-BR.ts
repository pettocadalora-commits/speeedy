import type { Messages } from "./en.js";

/**
 * Brazilian Portuguese translation of the canonical catalogue.
 *
 * Typed as `Messages`, so TypeScript fails the build when a key is missing or
 * misspelled — completeness is enforced by the compiler, not by review.
 *
 * Voice: `você` (3rd person), Brazilian vocabulary, direct and operational.
 * Product terms stay recognisable (RSVP, ORP, WPM).
 */
export const ptBR: Messages = {
	common: {
		close: "Fechar",
		cancel: "Cancelar",
		save: "Salvar",
		saved: "Salvo",
		delete: "Excluir",
		back: "Voltar",
		next: "Avançar",
		done: "Concluir",
		skip: "Pular",
		start: "Iniciar",
		stop: "Parar",
		pause: "Pausar",
		resume: "Retomar",
		restart: "Reiniciar",
		reset: "Redefinir",
		copy: "Copiar",
		copied: "Copiado",
		loading: "Carregando…",
		optional: "opcional",
		enabled: "Ativado",
		disabled: "Desativado",
		on: "Ligado",
		off: "Desligado",
	},
	shell: {
		loadingApp: "Carregando o Speeedy…",
		unexpectedError:
			"Algo deu errado. Recarregue a página — se continuar acontecendo, envie um feedback.",
		sharedReadingTitle: "Leitura compartilhada",
		badReadLink: "Não foi possível abrir esse link de leitura.",
	},
	profile: {
		pageTitle: "Perfil",
		language: "Idioma",
		languageHint: "Escolha o idioma usado pelo Speeedy.",
	},
	errors: {
		genericTitle: "Algo deu errado",
		offline:
			"Você parece estar sem conexão. Seus dados de leitura estão seguros neste aparelho.",
	},
};
