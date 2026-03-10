import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import Home from './pages/Home/index';
import History from './pages/History/index';
import Canvas from './pages/Canvas/index';
import Test from './pages/Test/index';
import Branch from './pages/Branch/index';

export default function App() {
	return (
		<Router>
			<div className="relative flex">
				<div className="flex-1 max-md:hidden">
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
