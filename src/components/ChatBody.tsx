import { useChatStore } from '@/store/chatStore';
import ChatMessage from './ChatMessage';
import '../styles/global.css';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useEffect } from 'react';
const ChatBody = () => {
	const chatMessages = useChatStore().getCurrentMessages();
	const { containerRef, autoScrollToBottom, forceScrollToBottom } =
		useAutoScroll();

	//每次消息更新时滚动到底部

	//用户发送信息时强制滚动到底部
	useEffect(() => {
		forceScrollToBottom();
	}, [chatMessages?.length]);

	//在模型发送信息时可以取消自动滚动效果
	useEffect(() => {
		autoScrollToBottom();
	}, [chatMessages?.at(-1)?.content]);

	return (
		<main className="chat-body" ref={containerRef}>
			{chatMessages ? (
				chatMessages?.map((msg, index) => <ChatMessage {...msg} key={index} />)
			) : (
				<p className="">请输入你的问题</p>
			)}
		</main>
	);
};

export default ChatBody;
