import React, { useContext } from "react";
import BoardContext from "../context/board";

function MoveParallel({coord}:{coord:string}){
    const {movePieceParallelClick, activePiece, displayCoords} = useContext(BoardContext);
    return <div className='piece moveParallel' onClick={()=>(movePieceParallelClick(activePiece,coord))}>
        {displayCoords && <span>{coord}</span>}
    </div>


}

export default MoveParallel;