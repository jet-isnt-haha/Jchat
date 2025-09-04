import { useAppConfig, useTexts } from '@/hooks/useConfig';
import type { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChatSession as _ChatSession } from '~/packages/types/chatType';
import IconButton from '../common/IconButton';
import { useScreenSize } from '@/hooks/useScreenSize';

interface ChatSessionProps extends HTMLAttributes<HTMLDivElement> {
	session: _ChatSession;
	onMoreClick: () => void;
}

const ChatSession = ({
	session,
	style,
	onTouchStart,
	onTouchMove,
	onTouchEnd,
	onMoreClick
}: ChatSessionProps) => {
	const navigate = useNavigate();
	const { routes } = useAppConfig();
	const { icons } = useTexts();
	const [isLargeScreen] = useScreenSize(768);
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
			{isLargeScreen && (
				<IconButton
					className={icons.more}
					styleClass="cursor-pointer opacity-0 w-8 h-8 leading-8 rounded-2xl bg-[#6D4FC2]/30  hover:opacity-50"
					onClick={(e) => {
						e.stopPropagation();
						onMoreClick();
					}}
				></IconButton>
			)}
		</div>
	);
};

export default ChatSession;
