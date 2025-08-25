import type { ChatSession, Message } from '~/packages/types/chatType';

export const useBranchCollapse = (session: ChatSession) => {
	let currentMessage: Message | null = null;
	let modelMessage: Message | null = null;
	if (session.parentLastMessageId && session.messages.length > 0) {
		const idIndex = session.messages.findIndex(
			(msg) => msg.id === session.parentLastMessageId
		);
		// 修复：idIndex 可能为 0（有效索引），需用 !== -1 判断
		if (idIndex !== -1 && idIndex + 1 < session.messages.length) {
			modelMessage = session.messages[idIndex];
			currentMessage = session.messages[idIndex + 1];
		}
	}
	return [modelMessage, currentMessage];
};
