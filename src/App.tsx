import BoardUI from './components/BoardUI/BoardUI';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

import { ReactComponent as Logo } from './assets/logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <BoardUI></BoardUI> */}
	  <Modal header={<Logo></Logo>} hideOverlay>
      <Button backgroundColor='var(--color-yellow)'>Play vs Player</Button>
      <Button>Game Rules</Button>
    </Modal>
    </div>
  );
}

export default App;
