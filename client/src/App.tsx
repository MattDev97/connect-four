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
				<div>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter message"
					/>
					<button onClick={sendMessage}>Send</button>
				</div>
				<div>
					<h2>Messages</h2>
					<ul>
						{messages.map((msg, index) => (
							<li key={index}>{msg}</li>
						))}
					</ul>
				</div>
				<Routes />
			</div>
			<div className="Footer"></div>
		</GameContextProvider>

	);
}

export default App;