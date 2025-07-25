import { create } from 'zustand';

//消息类型定义
export interface Message {
	id: string;
	content: string;
	role: 'user' | 'model' | 'system';
	timestamp: number;
	isLoading?: boolean;
	isError?: boolean;
}

//会话类型定义
interface ChatSession {
	id: string;
	title: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
}

//Store 状态类型
interface ChatStore {
	//状态
	session: ChatSession[];
	currentSessionId: string | null;
	isLoading: boolean;

	//Actions
}

//创建 zustand Store
export const useChatStore = create<ChatStore>(() => ({
	//初始状态
	session: [],
	currentSessionId: null,
	isLoading: false

	//创建新会话
}));
