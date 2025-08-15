import { useChatStore } from '@/store/chatStore';
import { useState } from 'react';
import ConfirmDialog from './common/ConfirmDialog';
import { useModals, useUIConfig } from '@/hooks/useConfig';

interface SessionModalProps {
	closeModal: () => void;
	sessionId: string;
}

const SessionModal = ({ closeModal, sessionId }: SessionModalProps) => {
	const { deleteSession } = useChatStore();
	const { confirmDelete, sessionActions } = useModals();
	const { colors } = useUIConfig();
	const [showConfirm, setShowConfirm] = useState(false);
	const handleOptionClick = (option: string) => {
		switch (option) {
			case 'delete': {
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
			{/* 半透明遮罩层 */}
			<div
				onClick={closeModal}
				className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
			/>

			{/* 底部弹出框 */}
			<div className="fixed inset-x-0 bottom-0 z-50 ">
				<div className="bg-white rounded-t-3xl shadow-2xl">
					{/* 拖拽指示器 */}
					<div
						className="flex justify-center py-3  rounded-t-3xl "
						style={{ backgroundColor: colors.secondary }}
					>
						<div
							className="w-10 h-1 bg-gray-300 rounded-full"
							onClick={closeModal}
						></div>
					</div>

					{/* 选项列表 */}
					<div className="px-4 pb-6">
						{sessionActions.options.map((option, index) => (
							<div
								key={index}
								className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors duration-150 ${
									option.danger
										? 'hover:bg-red-50 active:bg-red-100'
										: 'hover:bg-gray-50 active:bg-gray-100'
								}`}
								onClick={() => handleOptionClick(option.action)}
							>
								<span className="text-2xl">{option.icon}</span>
								<span
									className={`text-lg ${
										option.danger ? 'text-red-600' : 'text-gray-700'
									}`}
								>
									{option.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
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
