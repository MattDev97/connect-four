
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

import { ReactComponent as Logo } from '../assets/logo.svg';

function Home(): JSX.Element {
  return (
	<Modal header={<Logo></Logo>} backgroundColor='var(--color-light-purple)'hideOverlay>
		<Button url='/game/' backgroundColor='var(--color-yellow)'>Play vs Player</Button>
		<Button url='/rules/'>Game Rules</Button>
	</Modal>
  );
}

export default Home;