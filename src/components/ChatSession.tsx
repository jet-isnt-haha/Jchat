import type { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChatSession as _ChatSession } from '~/packages/types/chatType';

interface ChatSessionProps extends HTMLAttributes<HTMLDivElement> {
	session: _ChatSession;
}

const ChatSession = ({
	session,
	style,
	onTouchStart,
	onTouchEnd
}: ChatSessionProps) => {
	const navigate = useNavigate();
	return (
		<div
			className="session"
			onClick={() => {
				navigate(`/session/${session.id}`);
			}}
			style={style}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		>
			{session.title}
		</div>
	);
};

export default ChatSession;
