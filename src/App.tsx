import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
export default function App() {
	return (
		<Router>
			{/* 	<Navigation /> */}
			<Routes>
				<Route path="/session" element={<Home />} />
				<Route path="/session/:id" element={<Home />} />
				<Route path="/history" element={<History />} />
				<Route path="*" element={<Navigate to="/session" />} />
			</Routes>
		</Router>
	);
}
