import ChatMessage from './components/ChatMessage';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useEffect } from 'react';
import { useTexts } from '@/hooks/useConfig';
import type { Message } from '@/types/chatType';
import { useChatStore } from '@/store';
import TempModeBar from '@/pages/Home/components/TempModeBar';

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
		<main
			className="flex flex-col gap-5 p-[25px_22px] h-[700px] overflow-y-auto mb-[82px] scrollbar-thin scrollbar-thumb-[#ddd3f9] scrollbar-track-transparent"
			ref={containerRef}
		>
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
