import { useChatStore } from '@/store/chatStore';
import ChatbotIcon from './ChatbotIcon';
import ChatMessage from './ChatMessage';
import '../styles/global.css';
const ChatBody = () => {
	const chatMessages = useChatStore().session[0].messages;

	return (
		<main className="chat-body">
			<div className="message bot-message">
				<ChatbotIcon />
				<p className="message-text">Hey,how can i help u</p>
			</div>
			{chatMessages.map((msg, index) => (
				<ChatMessage {...msg} key={index} />
			))}
		</main>
	);
};

export default ChatBody;
