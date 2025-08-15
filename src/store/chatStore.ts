import { create } from 'zustand';
import { mockChatSessions } from '@/mocks/chatData';
import type {
	ChatSession,
	ChatStore,
	Message
} from '~/packages/types/chatType';
import config from '@/configs';

//创建 zustand Store
export const useChatStore = create<ChatStore>((set, get) => ({
	//初始状态
	sessions: import.meta.env.DEV ? mockChatSessions : [],
	currentSessionId: null,
	/* process.env.NODE_ENV === 'development'
			? mockChatSessions[0]?.id || null
			: null */
	isLoading: false,
	searchedSessions: null,
	currentController: null,

	setIsLoading: (status) => {
		set(() => ({
			isLoading: status
		}));
	},
	//创建新会话
	createSession: () => {
		const sessionId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
		const newSession: ChatSession = {
			id: sessionId,
			title: config.app.session.defaultTitle,
			messages: [],
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		set((state) => ({
			sessions: [newSession, ...state.sessions],
			currentSessionId: sessionId
		}));
		return sessionId;
	},
	addMessage: (messageData) => {
		const message: Message = {
			...messageData,
			id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			timestamp: Date.now()
		};

		set((state) => {
			const sessions = state.sessions.map((session) => {
				if (session.id === state.currentSessionId) {
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

	updateMessage: (messageId, update) => {
		set((state) => {
			const sessions = state.sessions.map((session) => {
				if (session.id === state.currentSessionId) {
					const messages: Message[] = session.messages.map(
						(message: Message) => {
							if (message.id === messageId) {
								return (message = update);
							}
							return message;
						}
					);
					return {
						...session,
						messages: [...messages],
						updatedAt: Date.now(),
						title: session.title
					};
				}
				return session;
			});
			return { sessions };
		});
	},
	// updateSession: (sessionId, update) => {},
	getMessage: (messageId) => {
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
	},
	setCurrentSessionId: (id) => {
		set(() => {
			return { currentSessionId: id };
		});
	},
	setSearchSessions: (keywords) => {
		set((state) => {
			if (keywords) {
				const results: ChatSession[] = state.sessions.filter((session) =>
					session.title.includes(keywords)
				);
				return { searchedSessions: results };
			} else {
				return { searchedSessions: null };
			}
		});
	},
	deleteMessage: (messageId) => {
		set((state) => {
			const updatedSessions = state.sessions.map((session) => {
				//只处理当前会话
				if (session.id === state.currentSessionId) {
					const updatedMessages = session.messages.filter(
						(message) => message.id !== messageId
					);
					return {
						...session,
						messages: updatedMessages,
						updatedAt: Date.now()
					};
				}
				return session;
			});
			return { sessions: updatedSessions };
		});
	},
	deleteSession: (sessionId) => {
		set((state) => ({
			sessions: state.sessions.filter((s) => s.id !== sessionId),
			currentSessionId:
				state.currentSessionId === sessionId ? null : state.currentSessionId
		}));
	},
	getSession: (sessionId) => {
		const state = get();
		return state.sessions.find((session) => session.id === sessionId) ?? null;
	},
	setCurrentController: (controller) => set({ currentController: controller }),
	clearCurrentController: () => set({ currentController: null })
}));
