import { useContext } from "react";
import BoardContext from "../../context/board";

function Piece({coord}:{coord:string}){
    const {switchCoords,activatePieceClick,board, activePiece,availableMoves, attackPiece} = useContext(BoardContext);
    const attacked = availableMoves.includes(coord)
    const isActive = coord === activePiece?'active':'';
    const player = board.getAt(coord).value;

    const handleOnClick = ()=>{
        if (!attacked) return activatePieceClick(coord);
        if (!activePiece) return;
        else return attackPiece(coord);
    }
    return <div className={`piece ${isActive} ${player} ${attacked?'attacked':''}`} onClick={handleOnClick}>
        {isActive &&<div className={`active-${player}`}></div>}
        {attacked &&<div className={`${attacked?'attacked':''}-${player}`}></div>}
        {switchCoords && <span>{coord}</span>}
    </div>
}

export default Piece;