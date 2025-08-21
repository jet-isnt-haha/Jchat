import type { ChatActionsStrategy } from '~/packages/types/chatType';
import { useCreateSession } from '../useCreateSession';
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
