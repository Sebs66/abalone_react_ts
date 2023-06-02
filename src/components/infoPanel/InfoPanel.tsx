import './infoPanel.css'
import InfoScores from './InfoScores';

import InfoTurns from "./InfoTurns";

function InfoPanel(){
    return <div className="panel">
       <InfoScores></InfoScores>
       <InfoTurns></InfoTurns>
    </div>
}

export default InfoPanel