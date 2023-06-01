import React, { useContext } from "react";
import BoardContext from "../../context/board";

function MoveParallel({coord}:{coord:string}){
    const {movePieceParallelClick, activePiece, switchCoords, switchMovesHelp} = useContext(BoardContext);
    return <div className={`piece moveParallel ${switchMovesHelp?'show':''}`} onClick={()=>(movePieceParallelClick(activePiece,coord))}>
        {switchCoords && <span>{coord}</span>}
    </div>


}

export default MoveParallel;