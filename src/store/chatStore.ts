import { create } from 'zustand';
import { mockChatSessions } from '@/mocks/chatData';
import type { ChatStore, Message } from '~/packages/types/chatType';

//创建 zustand Store
export const useChatStore = create<ChatStore>((set) => ({
	//初始状态
	session: process.env.NODE_ENV === 'development' ? mockChatSessions : [],
	currentSessionId:
		process.env.NODE_ENV === 'development'
			? mockChatSessions[0]?.id || null
			: null,
	isLoading: false,

	//创建新会话

	addMessage: (messageData) => {
		const message: Message = {
			...messageData,
			id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			timestamp: Date.now()
		};

		set((state) => {
			const session = state.session.map((session) => {
				if (session.id === state.currentSessionId) {
					return {
						...session,
						messages: [...session.messages, message],
						updatedAt: Date.now(),
						title:
							session.messages.length === 0
								? message.content.slice(0, 20) + '...'
								: session.title
					};
				}
				return session;
			});
			return { session };
		});
	}
}));
