import BoardUI from "../components/BoardUI/BoardUI";
import Button from "../components/Button/Button";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import { ReactComponent as Logo } from '../assets/logo.svg';

import { useGameContext } from '../context/GameContext';

import styles from './Game.module.css';
import { useEffect } from "react";

function Game(): JSX.Element {
	const { playerOneScore, playerTwoScore, currentPlayer, board } = useGameContext();

	useEffect(() => {
		console.log('Player 1 Score:', playerOneScore);
		console.log('Player 2 Score:', playerTwoScore);
	}, [playerOneScore, playerTwoScore, board]);

	return (
		<div className={styles['game-container']}>
			<div className={styles['game-column']}>
				<PlayerCard name="Player 1" playerNumber={1} score={playerOneScore}/>
			</div>
			<div className={styles['game-column']}>
				<div className={styles['game-header'] + ' ' + styles['game-container']}>
					<div className={styles['game-column']}>
						{/* Menu */}
						<Button type="small" backgroundColor="var(--color-dark-purple)" textColor="white">Menu</Button>
					</div>
					<div className={styles['game-column']}>
						{/* Logo */}
						{currentPlayer === 1 ? <h1>Player 1's Turn</h1> : <h1>Player 2's Turn</h1>}
						<Logo></Logo>
					</div>
					<div className={styles['game-column']}>
						{/* Restart */}
						<Button type="small" backgroundColor="var(--color-dark-purple)" textColor="white">Restart</Button>
					</div>
				</div>
				<div className={styles['game-container']}>
					<BoardUI/>
				</div>
			</div>
			<div className={styles['game-column']}>
				<PlayerCard name="Player 2" playerNumber={2} score={playerTwoScore}/>
			</div>
		</div>
	);
  }
  
  export default Game;