import React, { useContext } from "react";
import BoardContext from "../context/board";

function Piece({coord}:{coord:string}){
    const {displayCoords,activatePieceClick,board, activePiece,setActivePiece, availableMoves} = useContext(BoardContext);
    const attacked = availableMoves.includes(coord)
    const isActive = coord === activePiece?'active':'';
    const player = board.getAt(coord).value;

    const handleOnClick = ()=>{
        if (!attacked) return activatePieceClick(coord)
        if (!activePiece) return
        console.log(activePiece)
        console.log('attacked!',coord)
        //TODO Hay que poner acá la función de mover, tenemos que mover la pieza activa acá y la pieza que estaba acá en el primer espacio vacío que haya en esa direccion (si esque hay).
        const hexBoard = board.attack(board.getAt(activePiece),board.getAt(coord));
        if (!hexBoard) return
        setActivePiece(undefined); /// re renders.
    }
    return <div className={`piece ${isActive} ${player} ${attacked?'attacked':''}`} onClick={handleOnClick}>
        {isActive &&<div className={`active-${player}`}></div>}
        {attacked &&<div className={`${attacked?'attacked':''}-${player}`}></div>}
        {displayCoords && <span>{coord}</span>}
    </div>
}

export default Piece;