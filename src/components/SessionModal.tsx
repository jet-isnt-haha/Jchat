import { useState } from 'react';
import ConfirmDialog from './common/ConfirmDialog';
import { useAppConfig, useModals } from '@/hooks/useConfig';
import { useChatStore } from '@/store';
import ItemModal from './common/ItemModal';
import { useNavigate } from 'react-router-dom';

interface SessionModalProps {
	closeModal: () => void;
	sessionId: string;
}

const SessionModal = ({ closeModal, sessionId }: SessionModalProps) => {
	const navigate = useNavigate();
	const { deleteSession, setCurrentSessionId } = useChatStore();
	const { confirmDelete, sessionActions } = useModals();
	const { routes } = useAppConfig();
	const [showConfirm, setShowConfirm] = useState(false);
	const handleOptionClick = (option: string) => {
		switch (option) {
			case sessionActions.option.delete: {
				setShowConfirm(true);
				break;
			}
			case sessionActions.option.branch: {
				setCurrentSessionId(sessionId);
				navigate(routes.branch);
				break;
			}
		}
	};

	const handleConfirmDelete = () => {
		deleteSession(sessionId);
		setShowConfirm(false);
		closeModal();
	};
	const handleCancelDelete = () => {
		setShowConfirm(false);
		closeModal();
	};

	return (
		<>
			<ItemModal
				closeModal={closeModal}
				items={sessionActions.options}
				handleItemsClick={handleOptionClick}
			/>
			{/* 确认删除对话框 */}
			<ConfirmDialog
				isOpen={showConfirm}
				title={confirmDelete.title}
				message={confirmDelete.message}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
				confirmText={confirmDelete.confirmText}
				cancelText={confirmDelete.cancelText}
				danger={true}
			/>
		</>
	);
};

export default SessionModal;
