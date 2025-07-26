import type { Message } from '~/packages/types/chatType';
import ChatbotIcon from './ChatbotIcon';
import '../styles/message.less';

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
