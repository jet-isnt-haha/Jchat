import config from '@/configs';
import type { StateCreator } from 'zustand';
import type {
	ChatStore,
	Message,
	MessageSlice
} from '~/packages/types/chatType';

export const createMessageSlice: StateCreator<
	ChatStore,
	[],
	[],
	MessageSlice
> = (set, get) => ({
	currentController: null,

	setCurrentController: (controller) => set({ currentController: controller }),
	clearCurrentController: () => set({ currentController: null }),
	addMessage: (messageData: Omit<Message, 'id' | 'timestamp'>) => {
		const message: Message = {
			...messageData,
			id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			timestamp: Date.now()
		};

		set((state) => {
			const currentSessionId = state.currentSessionId;
			if (!currentSessionId) return state;

			const sessions = state.sessions.map((session) => {
				if (session.id === currentSessionId) {
					const shouldUpdateTitle =
						session.messages.length === 0 && config.app.session.autoTitle;
					const newTitle = shouldUpdateTitle
						? message.content.slice(0, config.app.session.titleMaxLength) +
							config.app.session.titleSuffix
						: session.title;
					return {
						...session,
						messages: [...session.messages, message],
						updatedAt: Date.now(),
						title: newTitle
					};
				}
				return session;
			});
			return { sessions };
		});
	},
	updateMessage: (messageId: string, update: Message) => {
		set((state) => {
			const currentSessionId = state.currentSessionId;
			if (!currentSessionId) return state;

			const sessions = state.sessions.map((session) => {
				if (session.id === currentSessionId) {
					const updatedMessages: Message[] = session.messages.map(
						(message: Message) => {
							if (message.id === messageId) {
								return (message = update);
							}
							return message;
						}
					);
					return {
						...session,
						messages: [...updatedMessages],
						updatedAt: Date.now(),
						title: session.title
					};
				}
				return session;
			});
			return { sessions };
		});
	},
	deleteMessage: (messageId: string) => {
		set((state) => {
			const currentSessionId = state.currentSessionId;
			if (!currentSessionId) return state;
			const updatedSessions = state.sessions.map((session) => {
				if (session.id === currentSessionId) {
					const filteredMessages = session.messages.filter(
						(message) => message.id !== messageId
					);
					return {
						...session,
						messages: filteredMessages,
						updatedAt: Date.now()
					};
				}
				return session;
			});
			return { sessions: updatedSessions };
		});
	},
	getMessage: (messageId: string) => {
		const state = get();
		const messages = state.getCurrentMessages();
		return messages.find((message) => message.id === messageId) ?? null;
	},
	getCurrentMessages: () => {
		const state = get();
		const result = state.sessions.find(
			(session) => session.id === state.currentSessionId
		)?.messages;
		return result ?? [];
	}
});
