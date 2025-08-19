import { useNavigate } from 'react-router-dom';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import IconButton from './common/IconButton';
import ModeModal from './ModeModal';
import { useShowModal } from '@/hooks/useShowModal';

const HomeHeader = () => {
	const navigate = useNavigate();
	const { routes } = useAppConfig();
	const { icons } = useTexts();
	const { showModal, setShowModal } = useShowModal();
	return (
		<header className="chat-header">
			<IconButton
				className={icons.sort}
				onClick={() => {
					navigate(routes.history);
				}}
			/>

			<IconButton
				className={icons.edit}
				onClick={() => {
					setShowModal(true);
				}}
			/>
			{showModal && (
				<ModeModal
					closeModal={() => {
						setShowModal(false);
					}}
				/>
			)}
		</header>
	);
};

export default HomeHeader;
