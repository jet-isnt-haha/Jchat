import { useNavigate } from 'react-router-dom';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import IconButton from '@/components/ui/IconButton';
import ModeModal from './components/ModeModal';
import { useShowModal } from '@/hooks/useShowModal';

const HomeHeader = () => {
	const navigate = useNavigate();
	const { routes } = useAppConfig();
	const { icons } = useTexts();
	const { showModal, setShowModal } = useShowModal();
	return (
		<header className="flex items-center justify-between px-[22px] py-[15px] bg-[#6D4FC2] z-10">
			<IconButton
				className={icons.sort}
				styleClass="cursor-pointer hover:opacity-50"
				onClick={() => {
					navigate(routes.history);
				}}
			/>

			<IconButton
				className={icons.edit}
				styleClass="cursor-pointer hover:opacity-50"
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
