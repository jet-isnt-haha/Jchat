import type { ChatActionsStrategy, ChatMode } from '~/packages/types/chatType';
import NormalChatStrategy from './NormalChatStrategy';
import TempChatStrategy from './TempChatStrategy';

const getChatActionsStrategy = (mode: ChatMode): ChatActionsStrategy => {
	switch (mode) {
		case 'normal':
			return NormalChatStrategy();
		case 'temp':
			return TempChatStrategy();
		default:
			return NormalChatStrategy();
	}
};

export default getChatActionsStrategy;
