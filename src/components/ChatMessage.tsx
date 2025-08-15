import type { Message } from '~/packages/types/chatType';
import '../styles/global.css';
import { useTexts } from '@/hooks/useConfig';
import MessageActions from './MessageActions';
import { useMessageActions } from '@/hooks/useMessageActions';

const ChatMessage = (msg: Message) => {
	const { messages, icons, role } = useTexts();
	const { handleCopy, handleDelete, handleFavor, handleRefresh, handleShare } =
		useMessageActions(msg.id);
	return (
		<div
			className={`message ${msg.role === role.model ? role.model : role.user}-message ${msg.isError ? 'error' : ''}`}
		>
			{msg.content === messages.thinking ? (
				<span className={`material-symbols-outlined ${icons.search}`}>
					{icons.search}
				</span>
			) : (
				<p className="message-text">{msg.content}</p>
			)}
			{msg.role === role.model && (
				<MessageActions
					MessageId={msg.id}
					onCopy={handleCopy}
					onDelete={handleDelete}
					onFavor={handleFavor}
					onRefresh={handleRefresh}
					onShare={handleShare}
				/>
			)}
		</div>
	);
};

export default ChatMessage;
