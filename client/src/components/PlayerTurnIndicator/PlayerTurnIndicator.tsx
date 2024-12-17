import Rectangle from '../Rectangle/Reactangle';

import styles from './PlayerTurnIndicator.module.css';

type PlayerTurnIndicatorProps = {
	playerNumber?: number;
	currentPlayer?: number;
	countDown?: number;
}

function PlayerTurnIndicator({ playerNumber, currentPlayer }: PlayerTurnIndicatorProps): JSX.Element {

	return (
		<div className={styles['indicator-wrapper']}>
			<Rectangle backgroundColor={currentPlayer === 1 ? 'var(--color-pink)' : 'var(--color-yellow)'}>
				<div className={styles['indicator-content']}>
					{playerNumber === currentPlayer ? <h2>Your Turn</h2> : <h2>Player {currentPlayer}'s Turn</h2>}
				</div>
			</Rectangle>
		</div>
	);
  }
  
  export default PlayerTurnIndicator;