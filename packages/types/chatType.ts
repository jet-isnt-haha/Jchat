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

export interface ItemActions {
	icon: string;
	label: string;
	action: string;
	danger: boolean;
}

export interface SessionAndUpdater {
	session: ChatSession;
	updateState: (modifiedSession: ChatSession) => void;
}

export type ChatMode = 'normal' | 'temp';

//业务策略接口
export interface ChatActionsStrategy {
	handleCreateSession: () => void;
	handleGetMessages: () => Message[];
}

export interface MessageSlice {
	currentController: AbortController | null;

	addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
	updateMessage: (messageId: string, update: Message) => void;
	getMessage: (messageId: string) => Message | null;
	getCurrentMessages: () => Message[];
	getTempMessages: () => Message[];
	deleteMessage: (messageId: string) => void;
	setCurrentController: (controller: AbortController) => void;
	clearCurrentController: () => void;
}

export interface SessionSlice {
	sessions: ChatSession[];
	searchedSessions: ChatSession[] | null;
	tempSession: ChatSession | null;
	isInTempMode: boolean;
	chatMode: ChatMode;
	currentSessionId: string | null;

	setChatMode: (option: ChatMode) => void;
	setTempMode: (option: boolean) => void;
	createSession: () => string;
	setCurrentSessionId: (id: string) => void;
	setSearchSessions: (keywords: string) => void;
	deleteSession: (sessionId: string) => void;
	getSession: (sessionId: string) => ChatSession | null;

	//temp
	createTempSession: () => string;
	discardTempSession: () => void;
	saveTempSession: () => void;
}

export type ChatStore = SessionSlice & MessageSlice;
