
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';

function Home(): JSX.Element {
  return (
    <div>
		<Modal header={<Logo></Logo>} backgroundColor='var(--color-light-purple)'hideOverlay>
			<Link to='/game/'>
				<Button backgroundColor='var(--color-yellow)'>Play vs Player</Button>
			</Link>
			<Link to='/rules/'>
				<Button>Game Rules</Button>
			</Link>
		</Modal>
    </div>
  );
}

export default Home;