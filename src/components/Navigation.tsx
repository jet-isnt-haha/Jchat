//导航组件
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/history">History</Link>
				</li>
				<li>
					<Link to="">Session</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
