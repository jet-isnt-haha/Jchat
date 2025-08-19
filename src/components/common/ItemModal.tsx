import { useUIConfig } from '@/hooks/useConfig';
import type { ItemActions } from '~/packages/types/chatType';

interface ItemModalProps {
	closeModal: () => void;
	items: ItemActions[];
	handleItemsClick: (action: ItemActions['action']) => void;
}

const ItemModal = ({ closeModal, items, handleItemsClick }: ItemModalProps) => {
	const { colors } = useUIConfig();

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
						{items.map((option, index) => (
							<div
								key={index}
								className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors duration-150 ${
									option.danger
										? 'hover:bg-red-50 active:bg-red-100'
										: 'hover:bg-gray-50 active:bg-gray-100'
								}`}
								onClick={() => handleItemsClick(option.action)}
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
		</>
	);
};

export default ItemModal;
