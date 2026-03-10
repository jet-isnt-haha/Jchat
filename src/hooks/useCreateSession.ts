import { useChatStore } from '@/store';

// src/hooks/useCreateSession.ts
export const useCreateSession = () => {
	const createSession = useChatStore((state) => state.createSession);
	const setCurrentSessionId = useChatStore(
		(state) => state.setCurrentSessionId
	);
	const createTempSession = useChatStore((state) => state.createTempSession);
	const createChildSession = useChatStore((state) => state.createChildSession);

	// 只返回创建逻辑，不处理导航
	return {
		createNewSession: () => {
			const newId = createSession();
			setCurrentSessionId(newId);
			return newId; // 返回 ID，让调用者决定是否导航
		},
		createTempSession,
		createChildSession: (parentId: string, parentLastMessageId: string) => {
			const childId = createChildSession(parentId, parentLastMessageId);
			setCurrentSessionId(childId);
			return childId;
		}
	};
};
