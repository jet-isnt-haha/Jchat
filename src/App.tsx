import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import Home from './pages/home';
import History from './pages/history';
export default function App() {
	return (
		<Router>
			{/* 	<Navigation /> */}
			<Routes>
				<Route path="/session" element={<Home />} />
				<Route path="/session/:id" element={<Home />} />
				<Route path="/history" element={<History />} />
				<Route path="/*" element={<Navigate to="/session" />} />
			</Routes>
		</Router>
	);
}
