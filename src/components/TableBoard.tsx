import './components.css';
import { useContext } from 'react';
import PiecesContext from '../context/board';
import Row from './Row';

function TableBoard(){
    const {board} = useContext(PiecesContext);

    const boardLayout = board.board.map((row,index_row)=>{
        let rowPosition = index_row+1; 
        if (index_row > 4){ 
            rowPosition = 5-index_row%5-1;  /// Para ir de 1 a 5 a 1
        }
        return <Row rowPosition={rowPosition} row={row} index={index_row} key={index_row}></Row>
    });

    return (
    <div className='table'>
        <div className="board">
            {boardLayout}
        </div>
    </div>
    )
}

export default TableBoard;