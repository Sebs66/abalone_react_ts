import './Modal.css'

import BoardContext from '../../context/board';
import { useContext } from 'react';

const Modal = () => {
  const {setDisplayModal,board,setBoard, winner} = useContext(BoardContext);
  const handleClick = ()=>{
    setDisplayModal(false);
    setBoard(board.newGame())
  }

  return (
    <div className='modal'>
      <div className='msgBox'>
        The game has finished
        <span>{`${winner} player has won the game!`}</span>
        <button onClick={handleClick}>Restart</button>
      </div>
    </div>
  );
};

export default Modal;