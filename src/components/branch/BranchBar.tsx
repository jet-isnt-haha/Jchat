import { useTexts } from '@/hooks/useConfig';
import type { ChatSession, Message } from '~/packages/types/chatType';
import IconButton from '../common/IconButton';
import { useBranchBar } from '@/hooks/branch/useBranchBar';
import { useShowModal } from '@/hooks/useShowModal';
import { useTouchController } from '@/hooks/useTouchController';
import BranchModal from './BranchModal';

interface BranchBarProps {
	currentMessage: Message | null;
	modelMessage: Message | null;
	handleButton: () => void;
	handleContent: () => void;
	session: ChatSession;
	showState: boolean;
}

const BranchBar = ({
	currentMessage,
	modelMessage,
	handleButton,
	handleContent,
	session,
	showState
}: BranchBarProps) => {
	const { icons } = useTexts();
	const { bgColor } = useBranchBar(session);
	const { showModal, closeModal, selectedId, openModal } = useShowModal();
	const { handleTouchEnd, handleTouchStart, handleTouchMove } =
		useTouchController();

	return (
		<>
			<div
				className="flex items-center gap-2 p-2 rounded cursor-pointer transition-all border border-blue-300 hover:bg-gray-50"
				style={{ backgroundColor: bgColor }}
			>
				{session.children.length > 0 && (
					<IconButton
						className={showState ? icons.down : icons.right}
						onClick={handleButton}
					/>
				)}
				<div
					className="p-2  bg-gray-50 rounded border border-gray-200 w-full"
					onClick={handleContent}
					onTouchStart={handleTouchStart(() => {
						openModal(session.id);
					})}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					<span className="text-xs text-blue-500">{session.title}</span>
					{session.children.length > 0 && (
						<span className="text-xs text-green-500">
							（分支数：{session.children.length}）
						</span>
					)}
					{currentMessage && modelMessage && (
						<>
							<p>
								<span className="text-xs  text-green-500">
									{modelMessage.role}：
								</span>
								<span className="text-sm">
									{modelMessage.content.slice(0, 50)}...
								</span>
							</p>
							<p>
								<span className="text-xs text-blue-500">
									{currentMessage.role}：
								</span>
								<span className="text-sm">
									{currentMessage.content.slice(0, 50)}...
								</span>
							</p>
						</>
					)}
				</div>
			</div>
			{showModal && (
				<BranchModal closeModal={closeModal} sessionId={selectedId} />
			)}
		</>
	);
};

export default BranchBar;
