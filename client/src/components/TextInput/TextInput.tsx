import { ChangeEvent } from 'react';
import styles from './TextInput.module.css';

type TextInputProps = {
	placeholder?: string;
	styleObject?: React.CSSProperties;
	onChange?: (value: string) => void;
};

function TextInput({ placeholder = '', styleObject, onChange }: TextInputProps): JSX.Element {

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event.target.value);
		}
	};
	return (
		<input
			className={styles['input-wrapper']}
			style={styleObject}
			placeholder={placeholder}
			type="text"
			onChange={handleChange}
		/>
	);
}

export default TextInput;