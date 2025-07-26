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
export interface ChatSession {
	id: string;
	title: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
}

//Store 状态类型
export interface ChatStore {
	//状态
	session: ChatSession[];
	currentSessionId: string | null;
	isLoading: boolean;

	//Actions
}
