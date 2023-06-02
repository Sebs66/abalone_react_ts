import BoardContext from '../../context/board';
import { useContext } from 'react';


function InfoScores(){
    const {board} = useContext(BoardContext)

    const scores = board.getScores();


    return (
    <div className='scoresContainer'>
        <span>Scores</span>
        <div className="playersPieces">
            <div className={`piece b piece_info`}>
                <span>{scores.b}</span>
            </div>
            <div className={`piece w piece_info`}>
                <span>{scores.w}</span>
            </div>
        </div>
    </div>
    )
}

export default InfoScores;