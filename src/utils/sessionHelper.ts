import config from '@/configs';
import type {
	ChatSession,
	ChatStore,
	Message,
	SessionAndUpdater
} from '~/packages/types/chatType';

const addMessageToChatSession = (
	session: ChatSession,
	newMessage: Message
): ChatSession => {
	const shouldUpdateTitle =
		session.messages.length === 0 && config.app.session.autoTitle;
	const newTitle = shouldUpdateTitle
		? newMessage.content.slice(0, config.app.session.titleMaxLength) +
			config.app.session.titleSuffix
		: session.title;
	return {
		...session,
		messages: [...session.messages, newMessage],
		updatedAt: Date.now(),
		title: newTitle
	};
};

const updateMessageInChatSession = (
	session: ChatSession,
	messageId: string,
	update: Message
): ChatSession => {
	const updatedMessages: Message[] = session.messages.map((message) => {
		if (message.id === messageId) {
			return update;
		}
		return message;
	});

	return {
		...session,
		messages: updatedMessages,
		updatedAt: Date.now()
	};
};

const deleteMessageFromChatSession = (
	session: ChatSession,
	messageId: string
): ChatSession => {
	const filteredMessage = session.messages.filter(
		(message) => message.id !== messageId
	);

	return {
		...session,
		messages: filteredMessage,
		updatedAt: Date.now()
	};
};

const getSessionAndUpdater = (
	get: () => ChatStore,
	set: (updater: (state: ChatStore) => Partial<ChatStore> | ChatStore) => void
): SessionAndUpdater | null => {
	const state = get();
	//常规会话模式
	if (state.chatMode === 'normal' && state.currentSessionId) {
		const currrentSession = state.sessions.find(
			(session) => session.id === state.currentSessionId
		);
		if (currrentSession) {
			return {
				session: currrentSession,
				updateState: (modifedSession) => {
					set((currentState) => ({
						sessions: currentState.sessions.map((session) =>
							session.id === modifedSession.id ? modifedSession : session
						)
					}));
				}
			};
		}
	}

	return null;
};

export {
	addMessageToChatSession,
	updateMessageInChatSession,
	deleteMessageFromChatSession,
	getSessionAndUpdater
};
