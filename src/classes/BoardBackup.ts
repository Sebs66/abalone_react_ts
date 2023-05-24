class Board {
    board : (number|string)[][]
    constructor(){
        this.board = 
        [
            [0,0,0,0,0], // 5 slots
            [0,0,0,0,0,0], // 6 slots
            [0,0,0,0,0,0,0], // 7 slots
            [0,0,0,0,0,0,0,0], // 8 slots
            [0,0,0,0,0,0,0,0,0], // 9 slots
            [0,0,0,0,0,0,0,0], // 8 slots
            [0,0,0,0,0,0,0], // 7 slots
            [0,0,0,0,0,0], // 6 slots
            [0,0,0,0,0] // 5 slots
        ]            
    }

    setAt(coord:string,value:number|string){
        const row = parseInt(coord[0]);
        const column = parseInt(coord[1]);
        this.board[row][column] = value;
        return this.board;
    }

    insertMany(coords:string[],value:number|string){
        coords.forEach((coord)=>{
            this.setAt(coord,value)
        })
        return this.board;
    }

    getAt(coord:string){
        const row = parseInt(coord[0]);
        const column = parseInt(coord[1]);
        return this.board[row][column];
    }

    getAllPositions():{[key:string]:number|string}{
        const positions = this.board.reduce((acc,row,rowIndex)=>{
            const rowObject = row.reduce((acc:{[key:string]:number|string},value,columnIndex) =>{
                const coord = `${rowIndex}${columnIndex}`
                if (value === 'w'){
                    acc[coord] = 'w';
                } else if (value === 'b'){
                    acc[coord] = 'b';
                } 
                return acc
            },{});
            acc = {...acc,...rowObject};
            return acc
        },{});
        return positions
    }

    getCopy(){
        const newBoard = new Board();
        const positions = this.getAllPositions();
        Object.keys(positions).forEach((coord)=>{
            newBoard.setAt(coord,positions[coord])
        });
        return newBoard;
    }

    moveTo(coord1:string,coord2:string){
        const row1 = parseInt(coord1[0]);
        const column1 = parseInt(coord1[1]);
        const row2 = parseInt(coord2[0]);
        const column2 = parseInt(coord2[1]);
        const temp = this.board[row1][column1];
        this.board[row1][column1] = 0;
        this.board[row2][column2] = temp;
        return this;
    }

    static newGame(){
        const board = new Board();
        board.insertMany(['00','01','02','03','04'],'b');
        board.insertMany(['10','11','12','13','14','15'],'b');
        board.insertMany(['22','23','24'],'b');
        board.insertMany(['62','63','64'],'w');
        board.insertMany(['70','71','72','73','74','75'],'w');
        board.insertMany(['80','81','82','83','84'],'w');
        return board;
    }

    map(callback:()=>void){
        return this.board.map(callback)
    }

    getAdjacentCoords(coord:string) {
        const row = parseInt(coord[0]);
        const col = parseInt(coord[1]);
        
        let topLeft, topRight, left, right, bottomLeft, bottomRight
        /// Tenemos que separar por zonas.  Ya que la relación de las coord cambia!
        if (Number(coord) < 40){ /// Zona superior.
            topLeft = `${row - 1}${col-1}`; // Top Left
            topRight = `${row - 1}${col}`; // Top Right
            left = `${row}${col - 1}`; // Lef
            right = `${row}${col + 1}`; // Right
            bottomLeft = `${row + 1}${col}`; // Bottom Left
            bottomRight = `${row + 1}${col + 1}`; // Bottom Right
        } else if (Number(coord) >= 50){ /// Zona inferior.
            topLeft = `${row - 1}${col}`; // Top Left
            topRight = `${row - 1}${col+1}`; // Top Right
            left = `${row}${col - 1}`; // Lef
            right = `${row}${col + 1}`; // Right
            bottomLeft = `${row + 1}${col-1}`; // Bottom Left
            bottomRight = `${row + 1}${col}`; // Bottom Right
        } else { /// La linea de almedio.
            topLeft = `${row - 1}${col-1}`; // Top Left
            topRight = `${row - 1}${col}`; // Top Right
            left = `${row}${col - 1}`; // Lef
            right = `${row}${col + 1}`; // Right
            bottomLeft = `${row + 1}${col-1}`; // Bottom Left
            bottomRight = `${row + 1}${col}`; // Bottom Right
        }

        const possible = [topLeft,topRight,left,right,bottomLeft,bottomRight]
        const adjacentCoords = possible.filter((position)=>{
            const row_ = parseInt(position[0]);
            const col_ = parseInt(position[1]);
            if (Number(position)<40){
                return col_ < row_+5 && (position === '00' || Number(position)>0); /// Filtramos las coord invalidas. Números negativos y columans que se escapen de las válidas...
            } else if (Number(position)>=50){
                const rowRelative = 5-row_%5-2 /// para que la 5ta linea sea la relativa 4, la 6ta la linea 3, etc.
                return col_ < rowRelative+5 && Number(position) <= 90
            } else {
                return Number(position) < 49
            }
        });
    
    const coordsFinal = adjacentCoords.filter((coord)=>{return Number(coord) <= 84})
    return coordsFinal;
    }

    getAvailableMoves(activePiece:string|undefined):string[]{
        if (!activePiece) return []
        const adjacentSpots = this.getAdjacentCoords(activePiece);
        const directMoves = adjacentSpots.reduce((acc:string[],coord2)=>{
            const move = this._getDirectMove(activePiece,coord2);
            if (move) acc.push(move)
            return acc
        },[]);
        const moves = directMoves.filter(coord=>{
            return coord
        });
        console.log(moves);
        return moves
        //! falta ver el resto de los posibles movimientos!
    }

    _getDirectMove(coord1:string,coord2:string):string|undefined{ /// Recursive!
        //const player = this.getAt(coord1);
        if (!coord2) return undefined
        if (this.getAt(coord2) === 0){return coord2}
        const {direction,way} = this._getDirection(coord1,coord2);
        const coord3 = this._getNextSameDir(coord2,direction,way);
        return this._getDirectMove(coord2,coord3)
    }

    _getDirection(coord1:string,coord2:string){
        /// Can be horizontal, topLeft-bottomRight , topRight-bottomLeft.
        const c1 = parseInt(coord1)
        const c2 = parseInt(coord2)
        const distance = Math.abs(parseInt(coord1)-parseInt(coord2))
        let way;

        let direction;
        if (distance === 1){
            direction = 'horizontal'
            way = c1>c2? 'left':'right';
        } else if (distance === 11){
            direction = 'topLeft-bottomRight'
            way = c1>c2? 'left':'right';
        } else if (distance === 9){
            direction = 'topRight-bottomLeft'
            way = c1>c2? 'right':'left';
        } else if (distance === 10 && c2 >=50){
            direction = 'topLeft-bottomRight'
            way = c1>c2? 'left':'right'
        } else if (distance === 10 && c2 <=37) {
            direction = 'topRight-bottomLeft'
            way = c1>c2? 'right':'left'
        } else{ /// Case middle row. c2 is in the middle.
            if (c1 > c2){
                direction = coord1[0]===coord2[0]? 'topLeft-bottomRight':'topRight-bottomLeft'
                way = coord1[0] === coord2[0]? 'left':'right'
            } else {
                direction = coord1[0] === coord2[0]? 'topRight-bottomLeft':'topLeft-bottomRight'
                way = coord1[0] === coord2[0]? 'right':'left'
            }
        }
        return {direction,way}
    }

    _getNextSameDir(coord:string,direction:string,way:string){ /// Gets the closest next coord in the same direction.
        const possibleCoords = this.getAdjacentCoords(coord);
        const filteredCoord = possibleCoords.filter((coord2)=>{
            const {direction:direction2,way:way2} = this._getDirection(coord,coord2);
            return direction === direction2 && way === way2
        });
        return filteredCoord[0];
    }
}

export default Board;