import type { Message } from '~/packages/types/chatType';
import '../styles/global.css';
import { useTexts } from '@/hooks/useConfig';

const ChatMessage = (msg: Message) => {
	const { messages, icons } = useTexts();

	return (
		<div
			className={`message ${msg.role === 'model' ? 'bot' : 'user'}-message ${msg.isError ? 'error' : ''}`}
		>
			{msg.content === messages.thinking ? (
				<span className={`material-symbols-outlined ${icons.search}`}>
					{icons.search}
				</span>
			) : (
				<p className="message-text">{msg.content}</p>
			)}
		</div>
	);
};

export default ChatMessage;
