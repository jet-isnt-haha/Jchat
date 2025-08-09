interface ConfirmDialogProps {
	isOpen: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
	confirmText: string;
	cancelText: string;
	danger: boolean;
}

const ConfirmDialog = ({
	isOpen,
	title,
	message,
	onConfirm,
	onCancel,
	confirmText = '确认',
	cancelText = '取消',
	danger = false
}: ConfirmDialogProps) => {
	if (!isOpen) return null;

	return (
		<>
			{/* 遮罩层 */}
			<div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
				{/* 对话框 */}
				<div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
					{/* 标题 */}
					<div className="p-6 pb-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							{title}
						</h3>
						<p className="text-gray-600 text-sm leading-relaxed">{message}</p>
					</div>

					{/* 按钮组 */}
					<div className="flex gap-3 p-6 pt-2">
						<button
							onClick={onCancel}
							className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-150"
						>
							{cancelText}
						</button>
						<button
							onClick={onConfirm}
							className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors duration-150 ${
								danger
									? 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
									: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
							}`}
						>
							{confirmText}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmDialog;
