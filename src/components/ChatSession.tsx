import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChatSession as _ChatSession } from '~/packages/types/chatType';

interface ChatSessionProps {
	session: _ChatSession;
	style?: CSSProperties;
}

const ChatSession = ({ session, style }: ChatSessionProps) => {
	const navigate = useNavigate();
	return (
		<div
			className="session"
			onClick={() => {
				navigate(`/session/${session.id}`);
			}}
			style={style}
		>
			{session.title}
		</div>
	);
};

export default ChatSession;
