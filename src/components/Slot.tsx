import './components.css';
import BoardContext from "../context/board";

function Slot({coord}:{coord:string}){
    const {displayCoords} = useContext(BoardContext);
    const elementProps = {className:'slot',coord} /// Tenemos que definir los props afuera porque en TS, el elemento div no tiene la prop coord.
    return (
    <div {...elementProps} > 
        {displayCoords && <span>{coord}</span>}
    </div>
    )
}

export default Slot;


import React, { useContext } from "react";


    