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
// export interface ChatStore {
// 	//状态
// 	sessions: ChatSession[];
// 	currentSessionId: string | null;
// 	isLoading: boolean;
// 	searchedSessions: ChatSession[] | null;
// 	currentController: AbortController | null;
// 	//Actions
// 	createSession: () => string;
// 	addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
// 	updateMessage: (messageId: string, update: Message) => void;
// 	// updateSession: (sessionId: string, update: ChatSession) => void;
// 	getMessage: (messageId: string) => Message | null;
// 	getCurrentMessages: () => Message[];
// 	getSession: (sessionId: string) => ChatSession | null;
// 	setCurrentSessionId: (id: string) => void;
// 	setSearchSessions: (keywords: string) => void;
// 	deleteMessage: (messageId: string) => void;
// 	deleteSession: (sessionId: string) => void;
// 	setIsLoading: (status: boolean) => void;
// 	setCurrentController: (controller: AbortController) => void;
// 	clearCurrentController: () => void;
// }

export interface MessageSlice {
	currentController: AbortController | null;

	addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
	updateMessage: (messageId: string, update: Message) => void;
	getMessage: (messageId: string) => Message | null;
	getCurrentMessages: () => Message[];
	deleteMessage: (messageId: string) => void;
	setCurrentController: (controller: AbortController) => void;
	clearCurrentController: () => void;
}

export interface SessionSlice {
	sessions: ChatSession[];
	currentSessionId: string | null;
	searchedSessions: ChatSession[] | null;

	createSession: () => string;
	setCurrentSessionId: (id: string) => void;
	setSearchSessions: (keywords: string) => void;
	deleteSession: (sessionId: string) => void;
	getSession: (sessionId: string) => ChatSession | null;
}

export type ChatStore = SessionSlice & MessageSlice;
