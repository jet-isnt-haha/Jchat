import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import { useAppConfig } from '@/hooks/useConfig';

const HomeHeader = () => {
	const navigate = useNavigate();
	const { routes } = useAppConfig();
	return (
		<header className="chat-header">
			<div className="chat-info">
				<button
					onClick={() => {
						navigate(routes.history);
					}}
					className="material-symbols-outlined"
				>
					sort
				</button>
			</div>
			<button
				onClick={() => {
					navigate(routes.sessionNew);
				}}
				className="material-symbols-outlined"
			>
				edit_square
			</button>
		</header>
	);
};

export default HomeHeader;
