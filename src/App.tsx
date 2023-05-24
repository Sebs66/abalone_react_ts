import { useContext, useEffect } from "react";
import BoardContext from "./context/board";
import TableBoard from './components/TableBoard';

function App(){
  const {setAvailableMoves,getAvailableMovesCoords,board,activePiece} = useContext(BoardContext);

  useEffect(()=>{
    if (!activePiece) return
    const moves: string[] = getAvailableMovesCoords(board,activePiece);
    setAvailableMoves(moves);
  },[activePiece]);

  return <div><TableBoard></TableBoard></div>
}

export default App
