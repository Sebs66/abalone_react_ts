/* eslint-disable @typescript-eslint/no-empty-function */
//* Context using Board object!
import React, {createContext, useState, useEffect } from 'react';
import HexagonBoard from '../classes/HexagonBoard'; 

interface BoardContextValue {
    baseBoard: number[][],
    board:HexagonBoard,
    setBoard: React.Dispatch<React.SetStateAction<HexagonBoard>>,
    activePiece: undefined|string,
    setActivePiece: React.Dispatch<React.SetStateAction<string|undefined>>,
    availableMoves:(string|string[])[],
    setAvailableMoves: React.Dispatch<React.SetStateAction<(string|string[])[]>>,
    switchCoords:boolean,
    setSwitchCoords: React.Dispatch<React.SetStateAction<boolean>>,
    switchMovesHelp:boolean,
    setSwitchMovesHelp: React.Dispatch<React.SetStateAction<boolean>>,
    displayModal:boolean,
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
    activePlayer:string,
    winner:string|undefined,
    setWinner:React.Dispatch<React.SetStateAction<string|undefined>>,
    activatePieceClick:(coord:string)=>void,
    movePieceClick:(prevCoord:string|undefined,newCoord:string)=>void,
    movePieceParallelClick:(activePiece:string|undefined,coordParallel:string)=>void,
    getAvailableMovesCoords:(board:HexagonBoard,activePiece:string)=>(string|string[])[],
    attackPiece:(coord:string)=>void,
} 

const defaultValue = {
    baseBoard: [[]],
    board:HexagonBoard.newGame(),
    setBoard: ()=>{},
    activePiece:undefined,
    setActivePiece: () => {},
    availableMoves:[],
    setAvailableMoves: ()=>{},
    activePlayer:'b',
    switchCoords:false,
    setSwitchCoords: ()=>{},
    switchMovesHelp:false,
    setSwitchMovesHelp:()=>{},
    displayModal:false,
    setDisplayModal:()=>{},
    winner:undefined,
    setWinner:()=>{},
    activatePieceClick: () => {},
    movePieceClick: ()=>{},
    movePieceParallelClick: ()=>{},
    getAvailableMovesCoords: ()=>[],
    attackPiece: ()=>{},
};

const BoardContext = createContext<BoardContextValue>(defaultValue);

function Provider({children}:{children:React.ReactNode}){ /// A wrapper for the provider.
    const [board,setBoard] = useState(HexagonBoard.newGame()); /// Board.newGame(4) -> Para llenarlo de pelotas.
    const [activePiece,setActivePiece] = useState<string|undefined>(undefined);
    const [availableMoves,setAvailableMoves] = useState([] as (string|string[])[]);
    const [activePlayer,setActivePlayer] = useState(Math.random()>0.5?'b':'w');
    const [switchCoords, setSwitchCoords] = useState(false);
    const [switchMovesHelp, setSwitchMovesHelp] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);
    const [winner,setWinner] = useState<string|undefined>(undefined);

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

    useEffect(()=>{
        setActivePiece(undefined);
        setAvailableMoves([]);
    },[board]);

    useEffect(()=>{
        if (activePiece){
            setAvailableMoves(getAvailableMovesCoords(board,activePiece))
        } else setAvailableMoves([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[activePiece]);

    useEffect(()=>{ /// Win condition.
        const scores = board.getScores();
        const winCriteria = 6;
        if (Object.values(scores).includes(winCriteria)){
            //console.log('Game should end');
            scores.w === winCriteria ? setWinner('White'): setWinner('Black');
            setDisplayModal(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[activePlayer]);

    function getAvailableMovesCoords(board:HexagonBoard,activePiece:string):(string|string[])[]{
        if (!activePiece) return [] /// En caso de que no haya pieza activa.
        //console.log('getAvailableMovesCoords()')
        const activeHex = board.getAt(activePiece);
        const proyectedHexs = board.getProyectedHexsPerDir(activeHex);
        const moves: string[] = [];
        Object.keys(proyectedHexs).forEach((dirString)=>{
            //console.log(dirString);
            const moveInStraightDir = board.calculateMovesInStraightDir(activeHex,proyectedHexs[dirString]);
            if (moveInStraightDir) moves.push(moveInStraightDir.coords)
        });
        const parallelMoves = board.calculateMovesInParalelDir(activeHex);
        //console.log([...moves, ...parallelMoves])
        return [...moves,...parallelMoves];
        }

    const activatePieceClick = (coord:string)=>{
        if (activePlayer != board.getAt(coord).value) return; /// Only if player is active!
        if (activePiece === coord) return setActivePiece(undefined)
        setActivePiece(coord);
    }
    
    const movePieceClick = (prevCoord:string|undefined,newCoord:string)=>{
        if (!prevCoord) return
        //console.log(`move ${prevCoord} -> ${newCoord}`)
        board.setAt(prevCoord,0);
        board.setAt(newCoord,activePlayer)
        setBoard(board.getCopy());
        setActivePlayer(activePlayer=='b'?'w':'b') /// Changes player!
    }

    const attackPiece = (coord:string)=>{
        //console.log('attacked!',coord)
        if (!activePiece) return
        //TODO Hay que poner acá la función de mover, tenemos que mover la pieza activa acá y la pieza que estaba acá en el primer espacio vacío que haya en esa direccion (si esque hay).
        const hexBoard = board.attack(board.getAt(activePiece),board.getAt(coord));
        if (!hexBoard) return
        setActivePiece(undefined); /// re renders.
        setActivePlayer(activePlayer=='b'?'w':'b') /// Changes player!
    }


    const movePieceParallelClick = (activePiece:string|undefined,parallelCoord:string)=>{
        if (!activePiece) return
        //console.log(activePiece);
        //console.log(parallelCoord);
        /// Get the array that we want.
        const parallelMoves = availableMoves.filter(item=> {return typeof item == 'object'}) as string[][];
        const parallelMoveBlock = parallelMoves.filter(array=>{return array.includes(parallelCoord)})[0]; /// first one will always be the corresponding to active piece.
        /// cut the array up to the parallel coord (it returns the whole block!).
        const parallelMove:string[] = [];
        for (const coord of parallelMoveBlock){
            if (coord === parallelCoord){
                parallelMove.push(coord)
                break;
            }
            parallelMove.push(coord)
        }
        board.parallelMove(activePiece,parallelMove);
        setBoard(board.getCopy())
        setActivePlayer(activePlayer=='b'?'w':'b') /// Changes player!
    }

    return (
    <BoardContext.Provider value={{
        baseBoard,
        board,setBoard,
        activePiece,setActivePiece,
        availableMoves,setAvailableMoves,
        winner,setWinner,
        activatePieceClick, movePieceClick,
        getAvailableMovesCoords,
        movePieceParallelClick,
        activePlayer,
        attackPiece,
        switchCoords,setSwitchCoords,
        switchMovesHelp,setSwitchMovesHelp,
        displayModal,setDisplayModal,
    }}>
        {children}
    </BoardContext.Provider>
    );
}

export {Provider};
export default BoardContext;    

