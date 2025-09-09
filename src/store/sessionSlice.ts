import config from '@/configs';
import {
	getMainSessions as apiGetMainSessions,
	getMessages as apiGetMessages,
	getChildrenSessions as apiGetChildrenSessions,
	getChildMessages as apiGetChildMessages,
	insertChatSession as apiInsertChatSession,
	deleteSession as apiDeleteSession,
	updateSession as apiUpdateSession,
	insertChatSession,
	insertChatMessage
} from '@/services/apiSession';
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
	// sessions: import.meta.env.DEV ? mockChatSessions : [],
	sessions: [],
	currentSessionId: null,
	searchedSessions: null,
	tempSession: null,
	isInTempMode: false,
	chatMode: 'normal',

	hydrateSessionData: async () => {
		const state = get();
		if (!state.currentSessionId) return;

		const currentSession = state.findSessionById(state.currentSessionId);
		if (!currentSession) return;
		// 如果会话已有消息，不重新加载
		if (currentSession.messages && currentSession.messages.length > 0) {
			console.log('会话已有消息，跳过加载');
			return;
		}
		if (!currentSession?.parentId) {
			//获取当前会话的消息数组
			const messages = await apiGetMessages(state.currentSessionId);
			currentSession.messages = messages;
			//检查并链接当前会话的各个分支
			async function linkSessions(rootSession: ChatSession) {
				if (rootSession.isBranched) {
					const childrenSessions = await apiGetChildrenSessions(rootSession.id);
					rootSession.children = childrenSessions;
					for (const child of childrenSessions) {
						linkSessions(child);
					}
				}
			}

			await linkSessions(currentSession);
		} else if (currentSession?.parentId) {
			async function dfs(session: ChatSession) {
				if (session.parentId) {
					const parentSession = state.findSessionById(session.parentId);
					if (parentSession) {
						await dfs(parentSession);
					}
				}
				session.messages = await apiGetChildMessages(session.id);
			}
			await dfs(currentSession);
			console.log(currentSession);
		}
		const updatedSessions = state.sessions.map((session) =>
			session.id === state.currentSessionId
				? ({
						...currentSession
					} as ChatSession)
				: session
		);
		set({ sessions: updatedSessions });
	},
	setMainSessions: async () => {
		const sessions = await apiGetMainSessions();
		set({ sessions });
	},
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
	saveTempSession: async () => {
		const state = get();
		set((state) => {
			if (state.tempSession) {
				return { sessions: [state.tempSession, ...state.sessions] };
			} else return { sessions: state.sessions };
		});
		if (state.tempSession) {
			await insertChatSession(state.tempSession);
			state.tempSession.messages.forEach(async (msg) => {
				await insertChatMessage(msg);
			});
		}
	},
	createSession: async (session = null) => {
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
		await apiInsertChatSession(newSession);
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
	deleteSession: async (sessionId: string) => {
		const state = get();
		const found = state.findSessionById(sessionId);
		const root = state.findRootSessionById(sessionId);
		if (!found?.parentId) {
			set((state) => ({
				sessions: state.sessions.filter((s) => s.id !== sessionId)
			}));
		} else {
			const parent = state.findSessionById(found.parentId);
			if (parent) {
				parent.children =
					parent?.children.filter((child) => child.id !== sessionId) ?? [];
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
		return await apiDeleteSession(sessionId);
	},

	updateSession: async (sessionId: string, update) => {
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
		await apiUpdateSession(sessionId, update);
	},
	createChildSession: async (parentId: string, parentLastMessageId: string) => {
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
			await apiUpdateSession(parent.id, { isBranched: true });
			await apiInsertChatSession(childSession);
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
