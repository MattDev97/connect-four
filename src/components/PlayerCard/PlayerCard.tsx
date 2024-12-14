import Rectangle from '../Rectangle/Reactangle';
import styles from './PlayerCard.module.css';

import { ReactComponent as PlayerOne } from '../../assets/player-one.svg';
import { ReactComponent as PlayerTwo } from '../../assets/player-two.svg';

type PlayerCardProps = {
	name?: string;
	playerNumber?: 1 | 2;
	score?: number;
}

function PlayerCard({ name = 'NaN', playerNumber = 1, score = 0} : PlayerCardProps): JSX.Element {
	return (
		<div className={styles["player-card"]}>
			<div className={styles["player-card-icon"]}>
				{/* <img src={playerNumber === 1 ? playerOne : playerTwo} alt="Player Icon" /> */}
				{playerNumber === 1 ? <PlayerOne/> : <PlayerTwo/>}
			</div>
			<Rectangle backgroundColor="white" borderRadius='1.5rem'>
				<h2 className={styles["player-card-name"]}>
					{name}
				</h2>
				<h1 className={styles["player-card-score"]}>
					{score}
				</h1>
			</Rectangle>
			
		</div>
	);
  }
  
  export default PlayerCard;