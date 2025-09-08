//消息类型定义
export interface Message {
	id: string;
	content: string;
	role: 'user' | 'model' | 'system';
	timestamp: number;
	isLoading?: boolean;
	isError?: boolean;
	sessionId?: string;
}

//会话类型定义
export interface ChatSession {
	id: string;
	title: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
	isBranched?: boolean;
	parentId?: string;
	children: ChatSession[];
	parentLastMessageId?: string;
	userId?: string;
}
export interface DbSession {
	id: string;
	title: string;
	created_at: number;
	updated_at: number;
	is_branched: boolean;
	parent_id?: string;
	parent_last_message_id?: string;
	user_id?: string;
}

export interface DbMessage {
	id: string;
	content: string;
	role: 'user' | 'model' | 'system';
	time_stamp: number;
	is_loading?: boolean;
	is_error?: boolean;
	session_id: string;
}
export interface ItemActions {
	icon: string;
	label: string;
	action: string;
	danger: boolean;
}

export interface ConfirmConfig {
	title: string;
	message: string;
	confirmText: string;
	cancelText: string;
	danger: boolean;
}

export interface SessionAndUpdater {
	session: ChatSession;
	updateState: (modifiedSession: ChatSession) => void;
	shouldDBOperate: (DBFn: () => void) => void;
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
	createSession: (session?: Partial<ChatSession> | null) => Promise<string>;
	setCurrentSessionId: (id: string) => void;
	setSearchSessions: (keywords: string) => void;
	deleteSession: (sessionId: string) => void;
	updateSession: (sessionId: string, update: Partial<ChatSession>) => void;

	//temp
	createTempSession: () => string;
	discardTempSession: () => void;
	saveTempSession: () => void;

	//branch
	createChildSession: (parentId: string, parentLastMessageId: string) => string;
	findSessionById: (sessionId: string) => ChatSession | null;
	findRootSessionById: (sessionId: string) => ChatSession | null;

	setMainSessions: () => void;
	hydrateSessionData: () => void;
}

export type ChatStore = SessionSlice & MessageSlice;
