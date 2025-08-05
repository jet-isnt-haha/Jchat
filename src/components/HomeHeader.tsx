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
					side_navigation
				</button>
			</div>
			<button className="material-symbols-outlined">keyboard_arrow_down</button>
		</header>
	);
};

export default HomeHeader;
