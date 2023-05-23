import { useContext } from "react";
import BoardContext from "../context/board";

function Piece({coord}:{coord:string}){
    const {activatePieceClick,board,activePiece} = useContext(BoardContext);
    const isActive = coord === activePiece?'active':'';
    return <div className={`piece ${isActive} ${board.getAt(coord)}`} onClick={()=>activatePieceClick(coord)}>
        {<span>{coord}</span>}
    </div>
}

export default Piece;