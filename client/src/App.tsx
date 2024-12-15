import './App.css';
import Routes from './Routes';
import { GameContextProvider } from './context/GameContext';

import { useState, useEffect } from 'react';

import { io, Socket } from 'socket.io-client';
const socket: Socket = io('http://localhost:4000'); // Update with your backend URL in production

function App() {

	const [messages, setMessages] = useState<string[]>([]);
	const [input, setInput] = useState<string>('');

	useEffect(() => {
		// Listen for the "response" event from the server
		socket.on('response', (data: string) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		return () => {
			socket.disconnect(); // Clean up when component unmounts
		};
	}, []);

	const sendMessage = () => {
		if (input.trim()) {
			socket.emit('message', input); // Send message to the server
			setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);
			setInput(''); // Clear input field
		}
	};

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