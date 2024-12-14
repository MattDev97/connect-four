import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import TextInput from "../components/TextInput/TextInput";

function Connection(): JSX.Element {
	return (
	  <div>
		  <Modal backgroundColor='var(--color-white' hideOverlay>
			  <div>
			  <h2>CODE</h2>
				  <h1>JX432</h1>
				  <Button backgroundColor='var(--color-yellow)'>Host Game</Button>
				  
				  <h2>or</h2>
				  <p>Join game by entering code</p>
				  <TextInput></TextInput>
				  <Button backgroundColor='var(--color-pink)'>Join Game</Button>
			  </div>
		  </Modal>
	  </div>
	);
  }
  
  export default Connection;