import { type Message } from '@/store/chat';
import ChatbotIcon from './ChatbotIcon';

const ChatMessage = (msg: Message) => {
	return (
		<div
			className={`message ${msg.role === 'model' ? 'bot' : 'user'}-message ${msg.isError ? 'error' : ''}`}
		>
			{msg.role === 'model' && <ChatbotIcon />}
			{msg.content === 'Thinking...' ? (
				<span className="material-symbols-outlined search">search</span>
			) : (
				<p className="message-text">{msg.content}</p>
			)}
		</div>
	);
};

export default ChatMessage;
