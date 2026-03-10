import { useTexts } from '@/hooks/useConfig';
import { useMessageRender } from '@/hooks/useMessageRender';
import { cn } from '@/lib/utils';
import type { Message } from '@/types/chatType';

interface MessageBarProps {
	msg: Message;
}

const MessageBar = ({ msg }: MessageBarProps) => {
	const { messages, icons, role } = useTexts();
	const [renderedMessage] = useMessageRender(msg.content, msg.role);
	if (msg.role === role.system) {
		return <></>;
	}

	return (
		<>
			{msg.content === messages.thinking && msg.role === role.model ? (
				<span className={`material-symbols-outlined ${icons.search}`}>
					{icons.search}
				</span>
			) : (
				<p
					className={cn(
						'message-text p-[12px_16px] max-w-[75%] break-words whitespace-pre-line text-[0.95rem] select-text',
						msg.role === 'model' &&
							'bg-[#f6f2ff] rounded-[13px_13px_13px_3px] max-w-full',
						msg.role === 'user' &&
							'bg-[#6d4fc2] text-white rounded-[13px_13px_3px_13px]',
						msg.isError && 'text-red-500'
					)}
					dangerouslySetInnerHTML={{ __html: renderedMessage }}
				/>
			)}
		</>
	);
};

export default MessageBar;
