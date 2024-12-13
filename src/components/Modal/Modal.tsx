
import styles from './Modal.module.css';

type ModalProps = {
	hideOverlay?: boolean;
	children?: React.ReactNode;
	header?: React.ReactNode;
};

function Modal({hideOverlay = false, children, header } : ModalProps): JSX.Element {
  return (
	<div className={styles["modal-wrapper"]}>
		{
			!hideOverlay && <div className={styles["overlay"]}></div>
		}
		<div className={styles["modal-content_wrapper"]}>
			{
				header && <div className={styles["modal-header"]}>{header}</div>
			}
			<div className={styles["modal-content"]}>
				{children}
			</div>
		</div>
	</div>
    
  );
}

export default Modal;