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
			: null */ isLoading: false,
	searchedSessions: null,

	//创建新会话

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
	getCurrentMessages: () => {
		const state = get();
		return state.sessions.find(
			(session) => session.id === state.currentSessionId
		)?.messages;
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
				console.log('aaa', results);
				return { searchedSessions: results };
			} else {
				return { searchedSessions: null };
			}
		});
	},

	deleteSession: (sessionId) => {
		set((state) => ({
			sessions: state.sessions.filter((s) => s.id !== sessionId),
			currentSessionId:
				state.currentSessionId === sessionId ? null : state.currentSessionId
		}));
	}
}));
