import { useState } from 'react';
import ConfirmDialog from './common/ConfirmDialog';
import IconButton from './common/IconButton';
import { useModals } from '@/hooks/useConfig';
import { useChatStore } from '@/store';

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
	return (
		<>
			<div className="message-actions">
				<IconButton className="content_copy" onClick={onCopy} />
				<IconButton
					className="delete"
					danger={true}
					onClick={() => {
						setShowConfirm(true);
					}}
				/>
				<IconButton className="cards_star" onClick={onFavor} />
				<IconButton className="share" onClick={onShare} />
				{getCurrentMessages().at(-1)!.id === MessageId && (
					<IconButton className="refresh" onClick={onRefresh} />
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
