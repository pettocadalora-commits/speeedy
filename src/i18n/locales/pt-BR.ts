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
		profileTab: "Perfil",
		libraryTab: "Biblioteca",
		dataTab: "Dados",
		documentAdded: '"{title}" foi adicionado à sua biblioteca.',
		avatarAlt: "Avatar do perfil",
		displayName: "Nome de exibição",
		editDisplayName: "Editar nome de exibição",
		memberSince: "Membro desde {date}",
		profileImage: "Imagem do perfil",
		uploadingImage: "Enviando...",
		changeImage: "Alterar imagem",
		uploadImage: "Enviar imagem",
		removeImage: "Remover",
		imageStoredLocally: "Armazenada apenas no seu navegador.",
		emojiAvatar: "Avatar de emoji",
		setAvatarTo: "Definir avatar como {emoji}",
		customEmoji: "Emoji personalizado",
		customEmojiHint: "Ou digite / cole qualquer emoji que você quiser.",
		readingStats: "Estatísticas de leitura",
		words: "Palavras",
		averageWpm: "Média de WPM",
		time: "Tempo",
		readingProgress: "Progresso de leitura",
		retest: "Refazer teste →",
		takeTest: "Fazer o teste →",
		baselineWpm: "WPM inicial",
		currentAverageWpm: "Média atual de WPM",
		improvement: "Melhora",
		keepReading: "Continue lendo!",
		moreSessionsNeeded: "São necessárias mais sessões",
		baselineComprehension: "Compreensão inicial",
		noBaseline:
			"Você ainda não tem uma referência inicial. Faça o teste de leitura para medir seu WPM e sua compreensão — depois acompanhe sua melhora ao longo do tempo.",
		shareProfile: "Compartilhar perfil",
		privacyNotice: "Aviso de privacidade",
		privacyDescription:
			"Os links de perfil compartilhado incorporam as estatísticas selecionadas diretamente à URL. Scripts de análise, extensões do navegador, capturas de tela ou qualquer pessoa para quem você enviar o link poderão ler os dados pessoais incluídos nessa URL. Compartilhe um link com informações pessoais somente se você se sentir confortável com isso.",
		privacyAcknowledgment:
			"Eu entendo que os dados pessoais em um link compartilhado podem ficar visíveis para ferramentas de análise ou qualquer pessoa que tenha a URL.",
		includeProfileImage:
			"Incluir a imagem do perfil no cartão e no link compartilhados — isso aumenta o risco à privacidade e pode deixar a URL muito mais longa.",
		shareStatsCard: "Compartilhar cartão de estatísticas",
		viewFullStats: "Ver todas as estatísticas →",
		acknowledgePrivacy:
			"Confirme o aviso de privacidade acima para permitir dados pessoais nos links compartilhados.",
		exportProfile: "Exportar perfil",
		downloadBackupPrefix: "Baixe um arquivo de backup",
		downloadBackupSuffix:
			"com todas as suas configurações, seu histórico e suas estatísticas.",
		downloadSpeeedy: "Baixar .speeedy",
		importProfile: "Importar perfil",
		restoreBackupPrefix: "Restaure usando um arquivo",
		restoreBackupSuffix:
			"exportado anteriormente. Isso substituirá seus dados atuais.",
		importSpeeedy: "Importar .speeedy",
		resetAllData: "Redefinir todos os dados",
		resetAllDataDescription:
			"Exclua permanentemente todo o histórico de leitura, as configurações e as estatísticas. Essa ação não pode ser desfeita.",
		resetConfirmation:
			"Você tem certeza? Isso excluirá permanentemente todos os seus dados.",
		resetData: "Redefinir dados",
		addDocument: "Adicionar um documento à sua biblioteca",
		supportedDocumentTypes:
			"PDF · DOCX · TXT · EPUB · RTF · HTML · ODT · e mais",
		emptyLibrary: "Sua biblioteca está vazia.",
		readSomething: "Ler alguma coisa",
		readingHistory: "Histórico de leitura",
		totalDocuments: "{count} no total",
		previousPage: "Anterior",
		readAgain: "Ler novamente",
		resumePercent: "Retomar em {percent}%",
		documentMetadata: "{date} · {count} palavras",
		shareYourStats: "Compartilhe suas estatísticas",
		closeShareModal: "Fechar janela de compartilhamento",
		savingPng: "Salvando…",
		saveCardAsPng: "Salvar cartão como PNG",
		shareableLink: "Link compartilhável",
		copyShareableLink: "Copiar link compartilhável",
		previewShareCard: "Visualizar cartão compartilhado em uma nova aba",
		previewNewTab: "Visualizar em uma nova aba",
		saveImageError: "Não foi possível salvar a imagem. Tente novamente.",
		chooseImageFile: "Escolha um arquivo de imagem.",
		readImageError: "Não foi possível ler esse arquivo de imagem.",
		adjustImage: "Ajustar imagem",
		cropInstructions: "Arraste para reposicionar · role para ampliar",
		zoom: "Zoom",
		apply: "Aplicar",
		processImageError:
			"Não foi possível processar essa imagem. Tente usar um arquivo menor.",
	},
	errors: {
		genericTitle: "Algo deu errado",
		offline:
			"Você parece estar sem conexão. Seus dados de leitura estão seguros neste aparelho.",
	},
};
