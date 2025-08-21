import type { ChatActionsStrategy } from '~/packages/types/chatType';
import { useCreateSession } from '../useCreateSession';
import { useChatStore } from '@/store';

const NormalChatStrategy = (): ChatActionsStrategy => {
	const { createNewSession } = useCreateSession();
	const getCurrentMessages = useChatStore((state) => state.getCurrentMessages);
	return {
		handleCreateSession: createNewSession,
		handleGetMessages: getCurrentMessages
	};
};

export default NormalChatStrategy;
