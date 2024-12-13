import BoardUI from './components/BoardUI/BoardUI';
import Modal from './components/Modal/Modal';

import { ReactComponent as Logo } from './assets/logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <BoardUI></BoardUI> */}
	  <Modal header={<Logo></Logo>}></Modal>
    </div>
  );
}

export default App;
