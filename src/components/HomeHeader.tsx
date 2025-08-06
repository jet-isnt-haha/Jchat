import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const HomeHeader = () => {
	const navigate = useNavigate();
	return (
		<header className="chat-header">
			<div className="chat-info">
				<button
					onClick={() => {
						navigate('/history');
					}}
					className="material-symbols-outlined"
				>
					sort
				</button>
			</div>
			<button
				onClick={() => {
					navigate('/session/new');
				}}
				className="material-symbols-outlined"
			>
				edit_square
			</button>
		</header>
	);
};

export default HomeHeader;
