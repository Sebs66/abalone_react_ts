import './App.css'
import React,{ useContext, useEffect } from "react";
import BoardContext from "./context/board";
import TableBoard from './components/tableBoard/TableBoard';
import InfoPanel from './components/infoPanel/InfoPanel';

function App(){
  const {setAvailableMoves,getAvailableMovesCoords,board,activePiece} = useContext(BoardContext);

  useEffect(()=>{
    if (!activePiece) return
    const moves = getAvailableMovesCoords(board,activePiece);
    setAvailableMoves(moves);
  },[activePiece]);

  return <div className="content">
    <InfoPanel></InfoPanel>
    <div><TableBoard></TableBoard></div>
    </div>
}

export default App
