import { useContext } from "react";
import BoardContext from "../../context/board";

function Move({coord}:{coord:string}){
    const {movePieceClick, activePiece, switchCoords, switchMovesHelp} = useContext(BoardContext);
    return <div className={`piece move ${switchMovesHelp?'show':''}`} onClick={()=>(movePieceClick(activePiece,coord))}>
        {switchCoords && <span>{coord}</span>}
    </div>


}

export default Move;