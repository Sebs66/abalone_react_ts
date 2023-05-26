import React, { useContext } from "react";
import BoardContext from "../context/board";

function Piece({coord}:{coord:string}){
    const {activatePieceClick,board,activePiece, availableMoves} = useContext(BoardContext);
    const attacked = availableMoves.includes(coord)
    const isActive = coord === activePiece?'active':'';
    const player = board.getAt(coord).value;
    const handleOnClick = ()=>{
        if (!attacked) activatePieceClick(coord)
        console.log('attacked!',coord)
        //TODO Hay que poner acá la función de mover, tenemos que mover la pieza activa acá y la pieza que estaba acá un puesto en la misma dir.
    }
    return <div className={`piece ${isActive} ${player} ${attacked?'attacked':''}`} onClick={handleOnClick}>
        {<span>{coord}</span>}
        {attacked &&<div className={`${attacked?'attacked':''} ${player}`}></div>}
    </div>
}

export default Piece;