import ChatMessage from './ChatMessage';
import { useAutoScroll } from '@/hooks/common/useAutoScroll';
import { useEffect } from 'react';
import { useTexts } from '@/hooks/useConfig';
import type { Message } from '~/packages/types/chatType';
import { useChatStore } from '@/store';
import TempModeBar from '../temp-chat/TempModeBar';

interface ChatBodyProps {
	chatMessages: Message[];
	sessionId?: string | null;
}

const ChatBody = ({ chatMessages }: ChatBodyProps) => {
	const { containerRef, autoScrollToBottom, forceScrollToBottom } =
		useAutoScroll();
	const { messages } = useTexts();
	const isInTempMode = useChatStore((state) => state.isInTempMode);

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
			{/* <Canvas /> */}
			{isInTempMode && <TempModeBar />}
			{chatMessages.length ? (
				chatMessages?.map((msg, index) => {
					const isLast = index === chatMessages.length - 1;
					return (
						<ChatMessage
							{...msg}
							key={index}
							onRendered={isLast ? autoScrollToBottom : undefined}
						/>
					);
				})
			) : (
				<p className="">{messages.emptyChat}</p>
			)}
		</main>
	);
};

export default ChatBody;
