import { useState } from 'react';
import ConfirmDialog from './common/ConfirmDialog';
import IconButton from './common/IconButton';
import { useModals, useTexts } from '@/hooks/useConfig';
import { useChatStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useCreateSession } from '@/hooks/useCreateSession';

interface MessageActionsProps {
	MessageId: string;
	onCopy: () => void;
	onDelete: () => void;
	onFavor: () => void;
	onRefresh: () => void;
	onShare: () => void;
}

const MessageActions = ({
	MessageId,
	onCopy,
	onDelete,
	onFavor,
	onRefresh,
	onShare
}: MessageActionsProps) => {
	const [showConfirm, setShowConfirm] = useState(false);
	const { confirmDelete } = useModals();
	const getCurrentMessages = useChatStore((state) => state.getCurrentMessages);
	const { icons } = useTexts();

	const { createChildSession } = useCreateSession();
	const { currentSessionId } = useChatStore();
	const navigate = useNavigate();
	const createBranch = () => {
		if (currentSessionId) {
			const lastId = getCurrentMessages().at(-3)?.id;
			console.log(currentSessionId);
			console.log(lastId);
			if (lastId) createChildSession(currentSessionId, lastId);
		}
	};

	return (
		<>
			<div className="message-actions">
				<IconButton className={icons.copy} onClick={onCopy} />
				<IconButton
					className={icons.delete}
					danger={true}
					onClick={() => {
						setShowConfirm(true);
					}}
				/>
				<IconButton className={icons.star} onClick={onFavor} />
				<IconButton className={icons.share} onClick={onShare} />
				{getCurrentMessages().at(-1)!.id === MessageId && (
					<>
						<IconButton className={icons.refresh} onClick={onRefresh} />
						<IconButton
							className={icons.branch}
							onClick={() => createBranch()}
						/>
						<IconButton
							className={'danger'}
							onClick={() => navigate('/branch')}
						/>
					</>
				)}
			</div>
			<ConfirmDialog
				isOpen={showConfirm}
				title={confirmDelete.title}
				message={confirmDelete.message}
				onConfirm={() => {
					onDelete();
					setShowConfirm(false);
				}}
				onCancel={() => setShowConfirm(false)}
				confirmText={confirmDelete.confirmText}
				cancelText={confirmDelete.cancelText}
				danger={true}
			/>
		</>
	);
};

export default MessageActions;
