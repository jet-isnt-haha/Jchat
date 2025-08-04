import { useChatStore } from '@/store/chatStore';
import ChatMessage from './ChatMessage';
import '../styles/global.css';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useEffect } from 'react';
const ChatBody = () => {
	const chatMessages = useChatStore().getCurrentMessages();
	const { containerRef, scrollToBottom } = useAutoScroll();

	//每次消息更新时滚动到底部
	useEffect(() => {
		scrollToBottom();
	}, [chatMessages]);

	return (
		<main className="chat-body" ref={containerRef}>
			<div className="message bot-message">
				<p className="message-text">Hey,how can i help u</p>
			</div>
			{chatMessages?.map((msg, index) => (
				<ChatMessage {...msg} key={index} />
			))}
		</main>
	);
};

export default ChatBody;
