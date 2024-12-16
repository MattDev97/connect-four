import BoardUI from "../components/BoardUI/BoardUI";
import Button from "../components/Button/Button";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import { ReactComponent as Logo } from '../assets/logo.svg';

import { useGameContext } from '../context/GameContext';
import { useLocation } from 'react-router-dom';

import styles from './Game.module.css';
import Modal from "../components/Modal/Modal";
import { useEffect } from "react";

function Game(): JSX.Element {
	const location = useLocation();
  	const currentURL = location.pathname;
	const gameCode = currentURL.split('/').pop() || '';  // Get the current URL path
	const { playerOneScore, playerTwoScore, playerOneConnected, playerTwoConnected, currentPlayer, updateBoard, board, setGameCode } = useGameContext();

	useEffect(() => {
		console.log('Game code:', gameCode);
		setGameCode(gameCode);
	}, []);
	
	const handleMove = (row: number, col: number) => {
		// Update the game state with the move
		if (updateBoard) {
			updateBoard(col, currentPlayer);
		}
		// Additional logic to update the parent component
		console.log(`Move made at row: ${row}, col: ${col} by player: ${currentPlayer}`);
	};
	
	return (
		<div className={styles['game-container']}>
			<Modal header={<Logo></Logo>} backgroundColor='white'>
				<h2>Connecting...</h2>
				<h3>Player 1: {playerOneConnected ? 'Connected' : 'Not Connected'}</h3>
				<h3>Player 2: {playerTwoConnected ? 'Connected' : 'Not Connected'}</h3>
			</Modal>
			<div className={styles['game-column']}>
				<PlayerCard name="Player 1" playerNumber={1} score={playerOneScore}/>
			</div>
			<div className={styles['game-column']}>
				<div className={styles['game-header'] + ' ' + styles['game-container']}>
					<div className={styles['game-column']}>
						{/* Menu */}
						<Button url='/' type="small" backgroundColor="var(--color-dark-purple)" textColor="white">Menu</Button>
					</div>
					<div className={styles['game-column']}>
						{/* Logo */}
						<h1>Game Room: {gameCode}</h1>
						{currentPlayer === 1 ? <h1>Player 1's Turn</h1> : <h1>Player 2's Turn</h1>}
						<Logo></Logo>
					</div>
					<div className={styles['game-column']}>
						{/* Restart */}
						<Button url='/game/' type="small" backgroundColor="var(--color-dark-purple)" textColor="white">Restart</Button>
					</div>
				</div>
				<div className={styles['game-container']}>
					<BoardUI board={board} onMove={handleMove}/>
				</div>
			</div>
			<div className={styles['game-column']}>
				<PlayerCard name="Player 2" playerNumber={2} score={playerTwoScore}/>
			</div>
		</div>
	);
  }
  
  export default Game;