import { useChatStore } from '@/store/chatStore';
import { useCopyToClipboard } from './common/useCopyToClipboard';
import { useChatSubmit } from './useChatSubmit';

export const useMessageActions = (messageId: string) => {
	const getMessage = useChatStore((state) => state.getMessage);
	const deleteMessage = useChatStore((state) => state.deleteMessage);
	const message = getMessage(messageId)!;
	const { copyToClipboard } = useCopyToClipboard();
	const { fetchAndUpdateResponse, isLoading } = useChatSubmit();

	const handleCopy = async () => {
		const content = message.content;
		const result = await copyToClipboard(content);
		if (result) alert('复制成功');
	};
	const handleDelete = () => {
		deleteMessage(messageId);
	};

	const handleFavor = () => {
		console.log('Favor');
	};
	const handleRefresh = async () => {
		try {
			if (!isLoading) {
				deleteMessage(messageId);
				await fetchAndUpdateResponse();
			} else {
				alert('正在加载Message请稍后重试');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleShare = () => {
		console.log('Share');
	};
	return {
		handleCopy,
		handleDelete,
		handleFavor,
		handleRefresh,
		handleShare
	};
};
