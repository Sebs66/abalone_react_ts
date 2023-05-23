/* eslint-disable @typescript-eslint/no-empty-function */
//* Context using Board object!
import {createContext, useState, useEffect } from 'react';
import Board from '../classes/Board';

interface BoardContextValue {
    baseBoard: number[][],
    board:Board,
    activePiece: undefined|string,
    availableMoves:string[],
    setBoard: React.Dispatch<React.SetStateAction<Board>>,
    setActivePiece: React.Dispatch<React.SetStateAction<string|undefined>>,
    setAvailableMoves: React.Dispatch<React.SetStateAction<string[]>>,
    activatePieceClick:(coord:string)=>void,
    movePieceClick:(newCoord:string,prevCoord:string)=>void,
    getAvailableMoves:(board:Board,activePiece:string)=>void
} 

const defaultValue = {
    baseBoard: [[]],
    board:Board.newGame(),
    activePiece:undefined,
    availableMoves:[],
    setBoard: ()=>{},
    setActivePiece: () => {},
    setAvailableMoves: ()=>{},
    activatePieceClick: () => {},
    movePieceClick: ()=>{},
    getAvailableMoves: ()=>{}
};

const BoardContext = createContext<BoardContextValue>(defaultValue);

function Provider({children}:{children:React.ReactNode}){ /// A wrapper for the provider.
    const [board,setBoard] = useState(Board.newGame());
    const [activePiece,setActivePiece] = useState<string|undefined>(undefined);
    const [availableMoves,setAvailableMoves] = useState([] as string[]);

    const baseBoard =  [
        [0,0,0,0,0], // 5 slots
        [0,0,0,0,0,0], // 6 slots
        [0,0,0,0,0,0,0], // 7 slots
        [0,0,0,0,0,0,0,0], // 8 slots
        [0,0,0,0,0,0,0,0,0], // 9 slots
        [0,0,0,0,0,0,0,0], // 8 slots
        [0,0,0,0,0,0,0], // 7 slots
        [0,0,0,0,0,0], // 6 slots
        [0,0,0,0,0] // 5 slots
    ];

    function getAvailableMoves(board:Board,activePiece:string){
        if (!activePiece) return /// En caso de que no haya pieza activa.
        const adjacentSlots = board.getAdjacentCoords(activePiece); /// retorna coordenadas alrededor de la activa.
        /// Ahora veamos de que color es la activa.
        const posibleMoves = adjacentSlots.filter((coord:string)=>{
            const slot = board.getAt(coord);
            return !slot ;
        });
        return posibleMoves;
    }

    const activatePieceClick = (coord:string)=>{
        if (activePiece === coord) return setActivePiece(undefined)
        setActivePiece(coord);
    }
    
    const movePieceClick = (newCoord:string,prevCoord:string)=>{
        console.log(`move ${prevCoord} -> ${newCoord}`)
        const player = board.getAt(prevCoord); /// Gets the color.
        board.setAt(prevCoord,0);
        board.setAt(newCoord,player)
        setBoard(board.getCopy());
    }

    useEffect(()=>{
        setActivePiece(undefined);
        setAvailableMoves([]);
    },[board]);

    return (
    <BoardContext.Provider value={{
        baseBoard,
        board,setBoard,
        activePiece, setActivePiece,
        availableMoves, setAvailableMoves,
        activatePieceClick, movePieceClick,
        getAvailableMoves
    }}>
        {children}
    </BoardContext.Provider>
    );
}

export {Provider};
export default BoardContext;    

