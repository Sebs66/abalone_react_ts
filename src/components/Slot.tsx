import './components.css';
import BoardContext from '../context/board';
import React, { useContext } from 'react';

function Slot({coord}:{coord:string}){
    const {activatePieceClick,activePiece,setActivePiece,board} = useContext(BoardContext);

    const elementProps = {className:'slot',coord} /// Tenemos que definir los props afuera porque en TS, el elemento div no tiene la prop coord.
    
    const handleClick = (coord:string)=>{
        if (activePiece){ /// Si ya hay una, ver la siguiente coord y calcular distancia.
            //board.getDistance(activePiece,coord)
        } else {
            //setActivePiece(coord)
        }
    }
    
    
    return (
    <div {...elementProps} onClick={()=>{handleClick(coord)}}> 
        {<span>{coord}</span>}
    </div>
    )
}



function Slot_backup({coord}:{coord:string}){
    const elementProps = {className:'slot',coord} /// Tenemos que definir los props afuera porque en TS, el elemento div no tiene la prop coord.
    return (
    <div {...elementProps}> 
        {<span>{coord}</span>}
    </div>
    )
}


export default Slot;