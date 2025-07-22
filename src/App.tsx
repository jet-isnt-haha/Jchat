import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';

export default function App() {
	return (
		<Router>
			{/* 	<Navigation /> */}
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}
