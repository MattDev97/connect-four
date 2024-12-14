import styles from './Button.module.css';

type ButtonProps = {
	alignment?: 'left' | 'center' | 'right';
    backgroundColor?: string;
	children?: React.ReactNode;
};

function Button({alignment = 'center', backgroundColor = 'white', children} : ButtonProps): JSX.Element {
    return (
      <button className={styles["button-wrapper"]} style={{backgroundColor : backgroundColor}}>
        {children}
      </button>
    );
  }
  
export default Button;