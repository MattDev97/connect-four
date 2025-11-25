import BoardUI from "../components/BoardUI/BoardUI";
import Button from "../components/Button/Button";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import { ReactComponent as Logo } from '../assets/logo.svg';

import { useGameContext } from '../context/GameContext';
import { useLocation } from 'react-router-dom';

import styles from './Game.module.css';
import Modal from "../components/Modal/Modal";
import { useEffect, useState } from "react";
import PlayerTurnIndicator from "../components/PlayerTurnIndicator/PlayerTurnIndicator";

function Game(): JSX.Element {
	const location = useLocation();
	const currentURL = location.pathname;
	const gameCode = currentURL.split('/').pop() || '';  // Get the current URL path
	const { playerOneScore, playerTwoScore, playerNumber, isCurrentPlayer, playerOneConnected, playerTwoConnected, currentPlayer, updateBoard, board, setGameCode } = useGameContext();
	const [showConnectingModal, setShowConnectingModal] = useState<boolean>(false);
	const [connectingModalText, setConnectingModalText] = useState<string>('Waiting for other players to join...');

	useEffect(() => {
		return () => {
			setGameCode('');
		}
	}, [])


	useEffect(() => {
		setGameCode(gameCode);
	}, [gameCode, setGameCode]);

	useEffect(() => {
		if (playerOneConnected && playerTwoConnected) {
			setConnectingModalText('Found players, starting game...');
			setTimeout(() => {
				setShowConnectingModal(false);
			}, 2000);
		} else {
			setConnectingModalText('Waiting for other players to join...');
			setShowConnectingModal(true);
		}
	}, [playerOneConnected, playerTwoConnected]);

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
			{
				(showConnectingModal) &&
				<Modal header={<Logo></Logo>} backgroundColor='white'>
					<h2>{connectingModalText}</h2>
					<h1>{gameCode}</h1>
					<h3>Player 1: {playerOneConnected ? 'Connected' : 'Not Connected'}</h3>
					<h3>Player 2: {playerTwoConnected ? 'Connected' : 'Not Connected'}</h3>
				</Modal>
			}

			<div className={styles['game-column']}>
				<PlayerCard name={playerNumber === 1 ? 'You' : 'Player 1'} playerNumber={1} score={playerOneScore} />
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
						<Logo></Logo>
					</div>
					<div className={styles['game-column']}>
						{/* Restart */}
						<Button url='/game/' type="small" backgroundColor="var(--color-dark-purple)" textColor="white">Restart</Button>
					</div>
				</div>
				<div className={styles['game-container']}>
					<BoardUI board={board} onMove={handleMove} currentPlayer={currentPlayer} playerNumber={playerNumber} isCurrentPlayer={isCurrentPlayer} />
					<div className={styles['player-turn-indicator']}>
						<PlayerTurnIndicator currentPlayer={currentPlayer} playerNumber={playerNumber} />
					</div>
				</div>
			</div>
			<div className={styles['game-column']}>
				<PlayerCard name={playerNumber === 2 ? 'You' : 'Player 2'} playerNumber={2} score={playerTwoScore} />
			</div>
		</div>
	);
}

export default Game;