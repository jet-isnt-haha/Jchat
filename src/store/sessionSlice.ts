import config from '@/configs';
import { mockChatSessions } from '@/mocks/chatData';
import type { StateCreator } from 'zustand';
import type {
	ChatStore,
	ChatSession,
	SessionSlice,
	ChatMode,
	Message
} from '~/packages/types/chatType';

export const createSessionSlice: StateCreator<
	ChatStore,
	[],
	[],
	SessionSlice
> = (set, get) => ({
	sessions: import.meta.env.DEV ? mockChatSessions : [],
	currentSessionId: null,
	searchedSessions: null,
	tempSession: null,
	isInTempMode: false,
	chatMode: 'normal',

	setChatMode: (option: ChatMode) => {
		set({ chatMode: option });
	},
	setTempMode: (option: boolean) => {
		set({ isInTempMode: option });
	},
	createTempSession: () => {
		const tempSession = get().tempSession;
		if (!tempSession) {
			const sessionId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
			const tempSession: ChatSession = {
				id: sessionId,
				title: '临时对话',
				messages: [],
				createdAt: Date.now(),
				updatedAt: Date.now(),
				isBranched: false,
				children: []
			};
			set({ tempSession });
			return sessionId;
		} else {
			return tempSession.id;
		}
	},
	discardTempSession: () => {
		set((state) => {
			state.setChatMode('normal');
			state.setTempMode(false);
			return { tempSession: null };
		});
	},
	saveTempSession: () => {
		set((state) => {
			if (state.tempSession)
				return { sessions: [state.tempSession, ...state.sessions] };
			else return { sessions: state.sessions };
		});
	},
	createSession: (session = null) => {
		const sessionId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
		const startMessage: Message = {
			content: '开始对话',
			id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			timestamp: Date.now(),
			role: 'system'
		};

		const newSession: ChatSession = {
			id: sessionId,
			title: config.app.session.defaultTitle,
			messages: [startMessage],
			createdAt: Date.now(),
			updatedAt: Date.now(),
			isBranched: false,
			children: [],
			...session
		};
		set((state) => ({
			sessions: [newSession, ...state.sessions]
		}));
		return sessionId;
	},
	setCurrentSessionId: (id: string) => {
		set(() => {
			return { currentSessionId: id };
		});
	},
	setSearchSessions: (keywords: string) => {
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
	deleteSession: (sessionId: string) => {
		set((state) => ({
			sessions: state.sessions.filter((s) => s.id !== sessionId),
			currentSessionId:
				state.currentSessionId === sessionId ? null : state.currentSessionId
		}));
	},

	updateSession: (sessionId: string, update) => {
		const state = get();
		const found = state.findSessionById(sessionId);
		const root = state.findRootSessionById(sessionId);
		if (!found?.parentId) {
			set((state) => ({
				sessions: state.sessions.map((s) => {
					if (s.id === sessionId) {
						s = { ...s, ...update };
					}
					return s;
				})
			}));
		} else {
			const parent = state.findSessionById(found.parentId);
			if (parent) {
				parent.children =
					parent?.children.map((child) => {
						if (child.id === sessionId) {
							return { ...child, ...update };
						}
						return child;
					}) ?? [];
				set((state) => ({
					sessions: state.sessions.map((s) => {
						if (s.id === root?.id) {
							return root;
						}
						return s;
					})
				}));
			}
		}
	},
	createChildSession: (parentId: string, parentLastMessageId: string) => {
		const state = get();
		const parent = state.findSessionById(parentId);
		const sessionId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
		if (parent) {
			const SlicedMessages = parent.messages.slice(0, -2);
			const childSession: ChatSession = {
				id: sessionId,
				title: config.app.session.defaultTitle,
				messages: SlicedMessages,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				isBranched: false,
				children: [],
				parentId,
				parentLastMessageId
			};
			parent.children.push(childSession);
			parent.isBranched = true;
		}
		return sessionId;
	},
	findSessionById: (sessionId: string) => {
		const state = get();
		function searchInSession(session: ChatSession): ChatSession | null {
			if (session.id === sessionId) return session;
			if (session.children && session.isBranched)
				for (const childSession of session.children) {
					const found = searchInSession(childSession);
					if (found) return found;
				}

			return null;
		}

		for (const session of state.sessions) {
			const found = searchInSession(session);
			if (found) return found;
		}
		return null;
	},
	findRootSessionById: (sessionId: string) => {
		const { findSessionById } = get();
		const childSession = findSessionById(sessionId);
		if (!childSession) return null;
		if (!childSession.parentId) return childSession;
		let parentSession = findSessionById(childSession.parentId);
		while (parentSession) {
			if (parentSession.parentId)
				parentSession = findSessionById(parentSession.parentId);
			else return parentSession;
		}
		return null;
	}
});
