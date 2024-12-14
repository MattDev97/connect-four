
import Rectangle from '../Rectangle/Reactangle';
import styles from './Modal.module.css';

type ModalProps = {
	backgroundColor?: string;
	hideOverlay?: boolean;
	children?: React.ReactNode;
	header?: React.ReactNode;
};

function Modal({hideOverlay = false, children, backgroundColor = '--color-light-purple', header } : ModalProps): JSX.Element {
  return (
	<div className={styles["modal-wrapper"]}>
		{
			!hideOverlay && <div className={styles["overlay"]}></div>
		}
		<Rectangle backgroundColor={backgroundColor}>
			{
				header && <div className={styles["modal-header"]}>{header}</div>
			}
			<div className={styles["modal-content"]}>
				{children}
			</div>
		</Rectangle>
	</div>
    
  );
}

export default Modal;