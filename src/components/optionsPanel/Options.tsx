import Switch from "./Switch";
import BoardContext from '../../context/board';
import { useContext } from 'react';


function Options(){
    const {switchCoords,setSwitchCoords, switchMovesHelp, setSwitchMovesHelp} = useContext(BoardContext)

    const handleSwitchCoordsToggle = ()=>{
        console.log('switch Coords')
        setSwitchCoords(!switchCoords)
    }

    const handleSwitchMovesHelpToggle = ()=>{
        console.log('switch MovesHelper')
        setSwitchMovesHelp(!switchMovesHelp)
    }

    return <div className="options">
        <span>Options</span>
        <div className="showCoordsContainer">
            <span>Show Coords</span>
            <Switch handleFunction={handleSwitchCoordsToggle} state={switchCoords} id='switchCoords'></Switch>
        </div>
        <div className="showMoveHelps">
            <span>Possible Moves</span>
            <Switch handleFunction={handleSwitchMovesHelpToggle} state={switchMovesHelp} id='switchHelpMoves'></Switch>
        </div>
    </div>
}

export default Options;