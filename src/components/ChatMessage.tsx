import type { Message } from '~/packages/types/chatType';
import '../styles/global.css';

const ChatMessage = (msg: Message) => {
	return (
		<div
			className={`message ${msg.role === 'model' ? 'bot' : 'user'}-message ${msg.isError ? 'error' : ''}`}
		>
			{msg.content === 'Thinking...' ? (
				<span className="material-symbols-outlined search">search</span>
			) : (
				<p className="message-text">{msg.content}</p>
			)}
		</div>
	);
};

export default ChatMessage;
