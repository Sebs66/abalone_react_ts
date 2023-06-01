import './infoPanel.css';

import BoardContext from '../../context/board';
import {useContext} from 'react';

function InfoTurns(){
    const {activePlayer} = useContext(BoardContext);
    console.log('Re render!')
    console.log(activePlayer)
    return <div className="turnsContainer">
        <span>Current Turn</span>
        {`${activePlayer=='b'? 'Black' : 'White'} player`} 
        <div className='playersPieces'>
            <div className={`piece b piece_info ${activePlayer=='b' && 'active'}`}>
                {activePlayer == 'b' &&<div className={`active-${activePlayer}`}></div>}
            </div>
            <div className={`piece w piece_info ${activePlayer=='w' && 'active'}`}>
                {activePlayer == 'w' &&<div className={`active-${activePlayer}`}></div>}
            </div>
        </div>
        </div>
}

export default InfoTurns;