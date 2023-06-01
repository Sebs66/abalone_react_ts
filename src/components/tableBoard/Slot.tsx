import './components.css';
import BoardContext from "../../context/board";
import { useContext } from "react";

function Slot({coord}:{coord:string}){
    const {switchCoords} = useContext(BoardContext);
    const elementProps = {className:'slot',coord} /// Tenemos que definir los props afuera porque en TS, el elemento div no tiene la prop coord.
    return (
    <div {...elementProps} > 
        {switchCoords && <span>{coord}</span>}
    </div>
    )
}

export default Slot;





    