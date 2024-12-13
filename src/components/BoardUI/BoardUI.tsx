import { ReactComponent as BoardFront } from '../../assets/board-front.svg';
import { ReactComponent as BoardBack } from '../../assets/board-back.svg';

import styles from './BoardUI.module.css';

function BoardUI(): JSX.Element {
  return (
    <div className={styles["board-wrapper"]}>
		<div className={styles["board-front"]}>
			<BoardFront/>
		</div>
		<div className={styles["board-back"]}>
			<BoardBack/>
		</div>
    </div>
  );
}

export default BoardUI;