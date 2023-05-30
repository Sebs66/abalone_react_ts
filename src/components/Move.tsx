import React, { useContext } from "react";
import BoardContext from "../context/board";

function Move({coord}:{coord:string}){
    const {movePieceClick, activePiece, displayCoords} = useContext(BoardContext);
    return <div className='piece move' onClick={()=>(movePieceClick(activePiece,coord))}>
        {displayCoords && <span>{coord}</span>}
    </div>


}

export default Move;