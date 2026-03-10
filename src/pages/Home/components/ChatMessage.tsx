import type { Message } from '@/types/chatType';
import { useTexts } from '@/hooks/useConfig';
import MessageActions from './MessageActions';
import { useMessageActions } from '../hooks/useMessageActions';
import { useMessageRender } from '../../../hooks/useMessageRender';
import { useOnRenderedCallback } from '@/hooks/useOnRenderedCallback';
import MessageBar from '@/components/MessageBar';
import { cn } from '@/lib/utils';

const ChatMessage = (msg: Message & { onRendered?: () => void }) => {
	const { role } = useTexts();
	const {
		handleCopy,
		handleDelete,
		handleFavor,
		handleRefresh,
		handleShare,
		handleBranch
	} = useMessageActions(msg.id);
	const [renderedMessage] = useMessageRender(msg.content, msg.role);
	useOnRenderedCallback(renderedMessage, msg.onRendered, 0);
	return (
		<div
			className={cn(
				'gap-[11px] items-center',
				msg.role === 'user' && 'flex flex-col items-end'
			)}
		>
			<MessageBar msg={msg} />

			{msg.role === role.model && !msg.isLoading && (
				<MessageActions
					MessageId={msg.id}
					onCopy={handleCopy}
					onDelete={handleDelete}
					onFavor={handleFavor}
					onRefresh={handleRefresh}
					onShare={handleShare}
					onBranch={handleBranch}
				/>
			)}
		</div>
	);
};

export default ChatMessage;
