import { useTexts } from '@/hooks/useConfig';
import { useMessageRender } from '@/hooks/useMessageRender';
import type { Message } from '~/packages/types/chatType';

interface MessageBarProps {
	msg: Message;
}

const MessageBar = ({ msg }: MessageBarProps) => {
	const { messages, icons, role } = useTexts();
	const [renderedMessage] = useMessageRender(msg.content, msg.role);

	return (
		<>
			{msg.content === messages.thinking && msg.role === role.model ? (
				<span className={`material-symbols-outlined ${icons.search}`}>
					{icons.search}
				</span>
			) : (
				<p
					className="message-text"
					dangerouslySetInnerHTML={{
						__html: renderedMessage
					}}
				/>
			)}
		</>
	);
};

export default MessageBar;
