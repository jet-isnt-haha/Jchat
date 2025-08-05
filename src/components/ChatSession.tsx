import { useNavigate } from 'react-router-dom';
import type { ChatSession as _ChatSession } from '~/packages/types/chatType';

const ChatSession = (session: _ChatSession) => {
	const navigate = useNavigate();
	return (
		<div
			className="session"
			onClick={() => {
				navigate(`/session/${session.id}`);
			}}
		>
			{session.title}
		</div>
	);
};

export default ChatSession;
