import styles from './TextInput.module.css';

function TextInput(): JSX.Element {
	return (
		<input className={styles['input-wrapper']} type="text"></input>
	);
}
  
  export default TextInput;