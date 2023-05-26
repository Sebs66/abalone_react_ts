/* eslint-disable @typescript-eslint/no-empty-function */
//* Context using Board object!
import React, {createContext, useState, useEffect } from 'react';
import HexagonBoard from '../classes/HexagonBoard'; 
import { HexagonInterface } from '../components/utils';

interface BoardContextValue {
    baseBoard: number[][],
    board:HexagonBoard,
    activePiece: undefined|string,
    availableMoves:string[],
    setBoard: React.Dispatch<React.SetStateAction<HexagonBoard>>,
    setActivePiece: React.Dispatch<React.SetStateAction<string|undefined>>,
    setAvailableMoves: React.Dispatch<React.SetStateAction<string[]>>,
    activatePieceClick:(coord:string)=>void,
    movePieceClick:(prevCoord:string|undefined,newCoord:string)=>void,
    getAvailableMovesCoords:(board:HexagonBoard,activePiece:string)=>string[]
} 

const defaultValue = {
    baseBoard: [[]],
    board:HexagonBoard.newGame(),
    activePiece:undefined,
    availableMoves:[],
    setBoard: ()=>{},
    setActivePiece: () => {},
    setAvailableMoves: ()=>{},
    activatePieceClick: () => {},
    movePieceClick: ()=>{},
    getAvailableMovesCoords: ()=>[]
};

const BoardContext = createContext<BoardContextValue>(defaultValue);

function Provider({children}:{children:React.ReactNode}){ /// A wrapper for the provider.
    const [board,setBoard] = useState(HexagonBoard.newGame()); /// Board.newGame(4) -> Para llenarlo de pelotas.
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

    function getAvailableMovesCoords(board:HexagonBoard,activePiece:string):string[]{
        if (!activePiece) return [] /// En caso de que no haya pieza activa.
        //console.log('getAvailableMovesCoords()')
        const activeHex = board.getAt(activePiece);
        const proyectedHexs = board.getProyectedHexsPerDir(activeHex);
        const moves: string[] = []
        Object.keys(proyectedHexs).forEach((dirString)=>{
            console.log(dirString);
            const moveInStraightDir = board.calculateMovesInStraightDir(activeHex,proyectedHexs[dirString]);
            if (moveInStraightDir) moves.push(moveInStraightDir.coords)
        });
        /// Debemos ver si esque estamos proximos a una pieza del adversario. En caso de estarlo, debemos calcular la cantidad de piezas juntas suyas y las nuestras en dicha dirección.
        /// Debemos tambien cortar en el primer hex que esté disponible.
        console.log('moves',moves)
        return moves;
        }

    const activatePieceClick = (coord:string)=>{
        if (activePiece === coord) return setActivePiece(undefined)
        setActivePiece(coord);
    }
    
    const movePieceClick = (prevCoord:string|undefined,newCoord:string)=>{
        if (!prevCoord) return
        console.log(`move ${prevCoord} -> ${newCoord}`)
        const player = board.getAt(prevCoord).value; /// Gets the color.
        board.setAt(prevCoord,0);
        board.setAt(newCoord,player)
        setBoard(board.getCopy());
    }

    useEffect(()=>{
        setActivePiece(undefined);
        setAvailableMoves([]);
    },[board]);

    useEffect(()=>{
        console.log(activePiece)
        if (activePiece){
            setAvailableMoves(getAvailableMovesCoords(board,activePiece))
        } else setAvailableMoves([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[activePiece])

    return (
    <BoardContext.Provider value={{
        baseBoard,
        board,setBoard,
        activePiece, setActivePiece,
        availableMoves, setAvailableMoves,
        activatePieceClick, movePieceClick,
        getAvailableMovesCoords
    }}>
        {children}
    </BoardContext.Provider>
    );
}

export {Provider};
export default BoardContext;    

