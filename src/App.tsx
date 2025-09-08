import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Canvas from './pages/Canvas';
import Test from './pages/Test';
import Branch from './pages/Branch';
import styles from './pages/index.module.less';
import { useChatStore } from './store';
import { useEffect } from 'react';

export default function App() {
	const setMainSessions = useChatStore((state) => state.setMainSessions);

	useEffect(() => {
		setMainSessions();
	}, [setMainSessions]);
	return (
		<Router>
			<div className={styles.section}>
				<div className={styles.test}>
					<Branch />
				</div>

				{/* 原有的路由配置不变 */}
				<Routes>
					<Route path="/session" element={<Home />} />
					<Route path="/session/:id" element={<Home />} />
					<Route path="/history" element={<History />} />
					<Route path="/canvas" element={<Canvas />} />
					<Route path="/test" element={<Test />} /> {/* 原/test路由保留 */}
					<Route path="/branch" element={<Branch />} />
					<Route path="*" element={<Navigate to="/session" />} />
				</Routes>
			</div>
		</Router>
	);
}
