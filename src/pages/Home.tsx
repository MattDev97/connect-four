
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';

function Home(): JSX.Element {
  return (
    <div>
		<Modal header={<Logo></Logo>} hideOverlay>
			<Link to='/Game/'>
				<Button backgroundColor='var(--color-yellow)'>Play vs Player</Button>
			</Link>
			<Link to='/Rules/'>
				<Button>Game Rules</Button>
			</Link>
			
		</Modal>
    </div>
  );
}

export default Home;