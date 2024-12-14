import BoardUI from "../components/BoardUI/BoardUI";
import Button from "../components/Button/Button";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import { ReactComponent as Logo } from '../assets/logo.svg';

import styles from './Game.module.css';

function Game(): JSX.Element {
	return (
		<div className={styles['game-container']}>
			<div className={styles['game-column']}>
				<PlayerCard name="Player 1" playerNumber={1} score={0}/>
			</div>
			<div className={styles['game-column']}>
				<div className={styles['game-header'] + ' ' + styles['game-container']}>
					<div className={styles['game-column']}>
						{/* Menu */}
						<Button type="small" backgroundColor="var(--color-dark-purple)" textColor="white">Menu</Button>
					</div>
					<div className={styles['game-column']}>
						{/* Logo */}
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
				<PlayerCard name="Player 2" playerNumber={2} score={0}/>
			</div>
		</div>
	);
  }
  
  export default Game;