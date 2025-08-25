import ItemModal from './common/ItemModal';
import { useNavigate } from 'react-router-dom';
import { useAppConfig, useModals } from '@/hooks/useConfig';
import { useChatStore } from '@/store';

interface ModeModalProps {
	closeModal: () => void;
}

const ModeModal = ({ closeModal }: ModeModalProps) => {
	const { routes } = useAppConfig();
	const { modeActions } = useModals();
	const navigate = useNavigate();
	const setTempMode = useChatStore((state) => state.setTempMode);

	const handleItemsClick = (option: string) => {
		switch (option) {
			case modeActions.option.temp: {
				setTempMode(true);
				closeModal();
				break;
			}
			case modeActions.option.new: {
				navigate(routes.sessionNew);
				closeModal();
				break;
			}
			case modeActions.option.branch: {
				navigate(routes.branch);
				closeModal();
				break;
			}
		}
	};

	return (
		<ItemModal
			items={modeActions.options}
			closeModal={closeModal}
			handleItemsClick={handleItemsClick}
		/>
	);
};

export default ModeModal;
