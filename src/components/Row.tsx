import './components.css'
import './Row.css'
import React, { useContext } from 'react';

import Piece from './Piece';
import Slot from './Slot';
import Move from './Move';
import MoveParallel from './MoveParallel';
import BoardContext from '../context/board';


import { HexagonInterface } from './utils';


type Props = {row:HexagonInterface[],index:number,rowPosition:number}

function Row ({row, index, rowPosition}:Props){
    const {board, availableMoves} = useContext(BoardContext);
    const composedMoves = availableMoves.filter((item)=>typeof item == 'object')
    const slots = row.map((_,index_col)=>{
        const coord = `${index}${index_col}`
        /// Check if a composed move includes these coords.
        const composedArray = composedMoves.filter((array)=>{return array.includes(coord)});
        /// Will do pieces and slots in parallel. This way Slot is independent from Piece, and it woll not rerender every time!. fix flickering!
        let type;
        if (board.getAt(coord).value){
            type = <Piece key={`P${coord}`} coord={coord}></Piece>
        } else if (availableMoves?.includes(coord)){
            type = <Move key={`M${coord}`} coord={coord}></Move>
        } else if (composedArray.length>0){
            type = <MoveParallel key={`M${coord}`} coord={coord}></MoveParallel> /// Only coords that are not in single moves posibilities.
        } else {
            type = <Slot coord={coord} key={`S${coord}`}></Slot>
        }
        return type
    })

    return <div className={`row row${rowPosition}`}>
        {slots}
    </div>
}

export default Row;