import config from '@/configs';
import { mockChatSessions } from '@/mocks/chatData';
import type { StateCreator } from 'zustand';
import type {
	ChatStore,
	ChatSession,
	SessionSlice
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

	createTempSession: () => {
		const sessionId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
		const tempSession: ChatSession = {
			id: sessionId,
			title: '临时对话',
			messages: [],
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		set({ tempSession, isInTempMode: true });
		return sessionId;
	},
	discardTempSession: () => {
		set({ tempSession: null, isInTempMode: false });
	},

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
	getSession: (sessionId: string) => {
		const state = get();
		return state.sessions.find((session) => session.id === sessionId) ?? null;
	}
});
