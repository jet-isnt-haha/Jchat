import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import { useAppConfig, useTexts } from '@/hooks/useConfig';
import IconButton from './common/IconButton';

const HomeHeader = () => {
	const navigate = useNavigate();
	const { routes } = useAppConfig();
	const { icons } = useTexts();
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
					navigate(routes.sessionNew);
				}}
			/>
		</header>
	);
};

export default HomeHeader;
