import type { ItemActions } from '~/packages/types/chatType';
import ItemModal from './common/ItemModal';
import { useNavigate } from 'react-router-dom';
import { useAppConfig } from '@/hooks/useConfig';
import { useChatStore } from '@/store';

interface ModeModalProps {
	closeModal: () => void;
}

const ModeModal = ({ closeModal }: ModeModalProps) => {
	const { routes } = useAppConfig();
	const navigate = useNavigate();
	const createTempSession = useChatStore((state) => state.createTempSession);
	const items: ItemActions[] = [
		{ icon: '⌛', label: '临时对话', action: 'temp_session', danger: false },
		{ icon: '💎', label: '新对话', action: 'new_session', danger: false }
	];
	const handleItemsClick = (option: string) => {
		switch (option) {
			case 'temp_session': {
				createTempSession();
				closeModal();
				break;
			}
			case 'new_session': {
				navigate(routes.sessionNew);
				closeModal();
				break;
			}
		}
	};

	return (
		<ItemModal
			items={items}
			closeModal={closeModal}
			handleItemsClick={handleItemsClick}
		/>
	);
};

export default ModeModal;
