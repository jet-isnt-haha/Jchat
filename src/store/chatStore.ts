import { create } from 'zustand';
import { mockChatSessions } from '@/mocks/chatData';
import type { ChatStore } from '~/packages/types/chatType';

//创建 zustand Store
export const useChatStore = create<ChatStore>(() => ({
	//初始状态
	session: mockChatSessions,
	currentSessionId: null,
	isLoading: false

	//创建新会话
}));
