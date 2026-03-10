import type { ChatActionsStrategy } from '@/types/chatType';
import { useCreateSession } from '@/hooks/useCreateSession';
import { useChatStore } from '@/store';

const TempChatStrategy = (): ChatActionsStrategy => {
	const { createTempSession } = useCreateSession();
	const getTempMessages = useChatStore((state) => state.getTempMessages);
	return {
		handleCreateSession: createTempSession,
		handleGetMessages: getTempMessages
	};
};

export default TempChatStrategy;
