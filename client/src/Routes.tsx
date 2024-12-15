import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Rules from './pages/Rules';
import Connection from './pages/Connection';


function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rules" element={<Rules />} />
				<Route path="/game" element={<Connection />} />
				<Route path="/game/:gameId" element={<Game />} />
			</Routes>
		</Router>
	)
};

export default AppRoutes;