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
			timestamp: Date.now()
		};

		const updatedSession = addMessageToChatSession(
			sessionInfo.session,
			newMessage
		);
		sessionInfo.updateState(updatedSession);
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
	},
	deleteMessage: (messageId: string) => {
		const sessionInfo = getSessionAndUpdater(get, set);
		if (!sessionInfo) return;

		const updatedSession = deleteMessageFromChatSession(
			sessionInfo.session,
			messageId
		);
		sessionInfo?.updateState(updatedSession);
	},
	getCurrentMessages: () => {
		const state = get();
		if (state.chatMode === 'normal' && state.currentSessionId) {
			return (
				state.sessions.find((session) => session.id === state.currentSessionId)
					?.messages ?? []
			);
		} else if (state.chatMode === 'temp' && state.tempSession) {
			return state.tempSession.messages;
		}

		return [];
	},
	getMessage: (messageId: string) => {
		const state = get();
		const messages = state.getCurrentMessages();
		return messages.find((message) => message.id === messageId) ?? null;
	}
});
