import { useChatStore } from '@/store/chatStore';

export const useSessionId = () => {
	const chatStore = useChatStore();
	const sessionId = chatStore.currentSessionId;
	return { sessionId };
};
