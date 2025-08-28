import { useAppConfig } from '@/hooks/useConfig';
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
	onTouchMove,
	onTouchEnd
}: ChatSessionProps) => {
	const navigate = useNavigate();
	const { routes } = useAppConfig();
	return (
		<div
			className="session"
			onClick={() => {
				navigate(`${routes.home}/${session.id}`);
			}}
			style={style}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			{session.title}
		</div>
	);
};

export default ChatSession;
