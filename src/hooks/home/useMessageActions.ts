import { useChatStore } from '@/store';
import { useCopyToClipboard } from '../common/useCopyToClipboard';
import { useChatSubmit } from '../useChatSubmit';
import { useCreateSession } from '../useCreateSession';
import { useExportSession } from '../useExportSession';

export const useMessageActions = (messageId: string) => {
	const { getMessage, deleteMessage, currentSessionId, getCurrentMessages } =
		useChatStore();
	const { createChildSession } = useCreateSession();
	const message = getMessage(messageId)!;
	const { copyToClipboard } = useCopyToClipboard();
	const { exportAsImage } = useExportSession();
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
		exportAsImage();
	};
	const handleBranch = () => {
		if (currentSessionId) {
			const lastId = getCurrentMessages().at(-3)?.id;
			if (lastId) createChildSession(currentSessionId, lastId);
		}
	};
	return {
		handleCopy,
		handleDelete,
		handleFavor,
		handleRefresh,
		handleShare,
		handleBranch
	};
};
