import styles from './TextInput.module.css';

type TextInputProps = {
	placeholder?: string;
	styleObject?: React.CSSProperties;
};

function TextInput({placeholder = '', styleObject} : TextInputProps): JSX.Element {
	return (
		<input className={styles['input-wrapper']} style={styleObject} placeholder={placeholder} type="text"></input>
	);
}
  
  export default TextInput;