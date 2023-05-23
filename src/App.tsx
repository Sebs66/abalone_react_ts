import { useContext, useEffect } from "react";
import BoardContext from "./context/board";
import TableBoard from './components/TableBoard';

function App(){
  const {setAvailableMoves,board,activePiece} = useContext(BoardContext);

  useEffect(()=>{
    const moves = board.getAvailableMoves(activePiece)
    setAvailableMoves(moves);
  },[activePiece]);

  return <div><TableBoard></TableBoard></div>
}

export default App
