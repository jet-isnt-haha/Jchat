import {
	deleteMessage as apiDeleteMessage,
	insertChatMessage,
	updateChatMessage
} from '@/services/apiSession';
import {
	addMessageToChatSession,
	deleteMessageFromChatSession,
	getSessionAndUpdater,
	updateMessageInChatSession
} from '@/utils/sessionHelper';
import type { StateCreator } from 'zustand';
import type {
	ChatStore,
	Message,
	MessageSlice
} from '~/packages/types/chatType';

export const createMessageSlice: StateCreator<
	ChatStore,
	[],
	[],
	MessageSlice
> = (set, get) => ({
	currentController: null,

	setCurrentController: (controller) => set({ currentController: controller }),
	clearCurrentController: () => set({ currentController: null }),
	addMessage: (messageData: Omit<Message, 'id' | 'timestamp'>) => {
		const sessionInfo = getSessionAndUpdater(get, set);
		if (!sessionInfo) return;
		const newMessage: Message = {
			...messageData,
			id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			timestamp: Date.now(),
			sessionId: sessionInfo.session.id
		};

		const updatedSession = addMessageToChatSession(
			sessionInfo.session,
			newMessage
		);
		sessionInfo.updateState(updatedSession);
		sessionInfo.shouldDBOperate(() => insertChatMessage(newMessage));
	},
	updateMessage: (messageId: string, update: Message) => {
		const sessionInfo = getSessionAndUpdater(get, set);
		if (!sessionInfo) return;

		const updatedSession = updateMessageInChatSession(
			sessionInfo.session,
			messageId,
			update
		);
		sessionInfo.updateState(updatedSession);
		sessionInfo.shouldDBOperate(() => {
			if (update.isLoading === false) updateChatMessage(messageId, update);
		});
	},
	deleteMessage: (messageId: string) => {
		const sessionInfo = getSessionAndUpdater(get, set);
		if (!sessionInfo) return;

		const updatedSession = deleteMessageFromChatSession(
			sessionInfo.session,
			messageId
		);
		sessionInfo?.updateState(updatedSession);
		sessionInfo.shouldDBOperate(() => apiDeleteMessage(messageId));
	},
	getCurrentMessages: () => {
		const state = get();
		if (!state.currentSessionId) return [];
		const session = state.findSessionById(state.currentSessionId);
		return session?.messages ?? [];
	},
	getTempMessages: () => {
		const state = get();
		return state.tempSession?.messages ?? [];
	},
	getMessage: (messageId: string) => {
		const state = get();
		const messages = state.getCurrentMessages();
		const tempMessages = state.getTempMessages();
		return (
			messages.find((message) => message.id === messageId) ??
			tempMessages.find((message) => message.id === messageId) ??
			null
		);
	}
});
