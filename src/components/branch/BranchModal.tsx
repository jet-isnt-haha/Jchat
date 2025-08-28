import { useModals } from '@/hooks/useConfig';
import ConfirmDialog from '../common/ConfirmDialog';
import ItemModal from '../common/ItemModal';
import { useState } from 'react';
import { useChatStore } from '@/store';

interface BranchModalProps {
	closeModal: () => void;
	sessionId: string;
}

const BranchModal = ({ closeModal, sessionId }: BranchModalProps) => {
	const { confirmDelete, branchActions } = useModals();
	const { deleteSession } = useChatStore();
	const [showConfirm, setShowConfirm] = useState(false);
	const handleOptionClick = (option: string) => {
		switch (option) {
			case branchActions.option.delete: {
				setShowConfirm(true);
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
				items={branchActions.options}
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

export default BranchModal;
