import styles from './Button.module.css';
import { ReactComponent as CheckMark } from '../../assets/check-mark.svg';

type ButtonProps = {
	alignment?: 'left' | 'center' | 'right';
    backgroundColor?: string;
	children?: React.ReactNode;
	type?: 'bubble' | 'small' | 'circle';
	textColor?: string;
};

function Button({alignment = 'center', backgroundColor = 'white', type = 'bubble', textColor = 'black', children} : ButtonProps): JSX.Element {
	let buttonClassName = styles["bubble-wrapper"];
	switch(type) {
		case 'bubble':
			buttonClassName = styles["bubble-wrapper"];
			break;
		case 'small':
			buttonClassName = styles["small-wrapper"];
			break;
		case 'circle':
			buttonClassName = styles["circle-wrapper"];
			break;
		default:
			buttonClassName = styles["bubble-wrapper"];
	}

    return (
		<button className={buttonClassName} style={{backgroundColor : backgroundColor, color : textColor}}>
			{
				type === 'circle' ? <CheckMark/> : children
			}
		</button>
    );
  }
  
export default Button;