import styles from './Rectangle.module.css';

type RectangleProps = {
	backgroundColor?: string;
	children?: React.ReactNode;
};

function Rectangle({children, backgroundColor = 'white'} : RectangleProps ): JSX.Element {
	return (
	  <div className={styles["rectangle-wrapper"]} style={{backgroundColor : backgroundColor}}>
		  {children}
	  </div>
	);
  }
  
  export default Rectangle;