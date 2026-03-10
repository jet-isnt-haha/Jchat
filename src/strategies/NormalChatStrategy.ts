// src/strategies/NormalChatStrategy.ts
import type { ChatActionsStrategy } from '@/types/chatType';
import { useChatStore } from '@/store';

const NormalChatStrategy = (): ChatActionsStrategy => {
	// 直接使用 store 的方法，而不是引用 useCreateSession
	const createSession = useChatStore((state) => state.createSession);
	const setCurrentSessionId = useChatStore(
		(state) => state.setCurrentSessionId
	);
	const getCurrentMessages = useChatStore((state) => state.getCurrentMessages);

	return {
		handleCreateSession: () => {
			const newId = createSession();
			setCurrentSessionId(newId);
			// 注意：路由导航应该在组件中处理，不在策略中
		},
		handleGetMessages: getCurrentMessages
	};
};

export default NormalChatStrategy;
