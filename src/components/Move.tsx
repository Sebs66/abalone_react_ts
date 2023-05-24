import { useContext } from "react";
import BoardContext from "../context/board";

function Move({coord}:{coord:string}){
    const {movePieceClick, activePiece} = useContext(BoardContext);
    return <div className='piece move' onClick={()=>(movePieceClick(activePiece,coord))}>
        {<span>{coord}</span>}
    </div>


}

export default Move;