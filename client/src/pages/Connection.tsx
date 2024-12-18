import React, { useEffect, useState } from 'react';

import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import TextInput from "../components/TextInput/TextInput";

import { useGameContext } from '../context/GameContext';

function Connection(): JSX.Element {
	const [inputValue, setInputValue] = useState<string>('');
	const [gameCode, setGameCode] = useState<string>('');

	useEffect(() => {
		setGameCode(Math.random().toString(36).substr(2, 5).toUpperCase());
	}, []);

	const handleInputChange = (value: string) => {
		setInputValue(value);
		console.log('Input value:', value);
	};

	return (
		<Modal backgroundColor='var(--color-white' hideOverlay>
			<div>
				<h2>CODE</h2>
				<h1>{gameCode}</h1>
				<Button url={`/game/${gameCode}`} backgroundColor='var(--color-yellow)'>Host Game</Button>
				<h2>or</h2>
				<p>Join game by entering code</p>
				<TextInput styleObject={{ textAlign: 'center' }} onChange={handleInputChange}></TextInput>
				<Button url={`/game/${inputValue}`} backgroundColor='var(--color-pink)'>Join Game</Button>

			</div>
		</Modal>
	);
}

export default Connection;