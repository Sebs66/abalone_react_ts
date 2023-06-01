import './infoPanel.css'

import InfoTurns from "./InfoTurns";
import Options from './Options';

function InfoPanel(){
    return <div className="panel">
        <Options></Options>
       <InfoTurns></InfoTurns>
    </div>
}

export default InfoPanel