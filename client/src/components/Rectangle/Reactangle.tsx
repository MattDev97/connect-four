import styles from './Rectangle.module.css';

type RectangleProps = {
	borderRadius?: '2.5rem' | '1.5rem' | '1rem' | '0.5rem' | '0.25rem' | '0.125rem' | '0';
	backgroundColor?: string;
	children?: React.ReactNode;
};

function Rectangle({children, backgroundColor = 'white', borderRadius = '2.5rem'} : RectangleProps ): JSX.Element {
	return (
	  <div className={styles["rectangle-wrapper"]} style={{backgroundColor : backgroundColor, borderRadius : borderRadius}}>
		  {children}
	  </div>
	);
  }
  
  export default Rectangle;