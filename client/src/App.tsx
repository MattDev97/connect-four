import './App.css';
import Routes from './Routes';
import { GameContextProvider } from './context/GameContext';

function App() {
	return (
		<GameContextProvider>
			<div className="App">
				<Routes />
			</div>
			<div className="Footer"></div>
		</GameContextProvider>
	);
}

export default App;