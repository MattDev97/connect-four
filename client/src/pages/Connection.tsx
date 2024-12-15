import React, { useEffect } from 'react';

import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import TextInput from "../components/TextInput/TextInput";

import { useGameContext } from '../context/GameContext';
import { Link } from 'react-router-dom';

function Connection(): JSX.Element {
	const { gameCode, generateGameCode } = useGameContext();

	useEffect(() => {
		if (!gameCode) {
			generateGameCode();
		}
	}, [gameCode, generateGameCode]);

	return (
	  <div>
		  <Modal backgroundColor='var(--color-white' hideOverlay>
			  <div>
			  <h2>CODE</h2>
				  <h1>{gameCode}</h1>
				  <Link to={`/game/${gameCode}`}>
				  	<Button backgroundColor='var(--color-yellow)'>Host Game</Button>
				  </Link>
				  
				  
				  <h2>or</h2>
				  <p>Join game by entering code</p>
				  <TextInput styleObject={{ textAlign: 'center' }}></TextInput>
				  <Link to={`/game/${gameCode}`}>
				  	<Button backgroundColor='var(--color-pink)'>Join Game</Button>
				  </Link>
			  </div>
		  </Modal>
	  </div>
	);
  }
  
  export default Connection;