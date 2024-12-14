import BoardUI from "../components/BoardUI/BoardUI";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import styles from './Game.module.css';

function Game(): JSX.Element {
	return (
		<div className={styles['game-container']}>
			<div className={styles['game-column']}>
				<PlayerCard name="Player 1" playerNumber={1} score={0}/>
			</div>
			<div className={styles['game-column']}>
				<BoardUI/>
			</div>
			<div className={styles['game-column']}>
				<PlayerCard name="Player 2" playerNumber={2} score={0}/>
			</div>
		</div>
	);
  }
  
  export default Game;