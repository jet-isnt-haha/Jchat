import { useState } from 'react';
import ConfirmDialog from './common/ConfirmDialog';
import IconButton from './common/IconButton';
import { useModals } from '@/hooks/useConfig';

interface MessageActionsProps {
	onCopy: () => void;
	onDelete: () => void;
	onFavor: () => void;
	onRefresh: () => void;
	onShare: () => void;
}

const MessageActions = ({
	onCopy,
	onDelete,
	onFavor,
	onRefresh,
	onShare
}: MessageActionsProps) => {
	const [showConfirm, setShowConfirm] = useState(false);
	const { confirmDelete } = useModals();

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
				<IconButton className="refresh" onClick={onRefresh} />
				<IconButton className="share" onClick={onShare} />
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
