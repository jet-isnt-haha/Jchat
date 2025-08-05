import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import History from './pages/history';
export default function App() {
	return (
		<Router>
			{/* 	<Navigation /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/history" element={<History />} />
			</Routes>
		</Router>
	);
}
