// https://www.redblobgames.com/grids/hexagons

import Hexagon from "./Hexagon";

class HexagonBoard {
    board : Hexagon[][];
    constructor(public levels:number){ /// q-r-s.
        this.board = [];
        let aux = 0; /// to decrease the starting number.
        /// Every level will create a row.
        let cartesianRow = 0;
        for (let r=-levels;r<=0;r++){ /// first half
            const row:Hexagon[] = [];
            let cartesianCol = 0;
            for (let q=aux;q<=levels;q++){
                const s = levels-q+aux;
                //console.log(`q:${q} r:${r} s:${s}`)
                row.push(new Hexagon(q,r,s,0,cartesianRow,cartesianCol))
                cartesianCol += 1;
            }
            aux -= 1;
            this.board.push(row);
            cartesianRow += 1;
        }
        aux = 1
        for (let r=1;r<=levels;r++){
            const row: Hexagon[] = []
            let cartesianCol = 0;
            for (let q=-levels;q<=levels-aux;q++){
                let s = (q+aux)*-1;
                if (s> -1 && s< 1) s = 0;
                row.push(new Hexagon(q,r,s,0,cartesianRow,cartesianCol))
                cartesianCol += 1;
            }
            aux += 1;
            this.board.push(row);
            cartesianRow += 1;
        }
    }

    static newGame(){ ///* Initiates a new abalone game.
        const board = new HexagonBoard(4);
        board.setMany(['00','01','02','03','04'],'b');
        board.setMany(['10','11','12','13','14','15'],'b');
        board.setMany(['22','23','24'],'b');
        board.setMany(['62','63','64'],'w');
        board.setMany(['70','71','72','73','74','75'],'w');
        board.setMany(['80','81','82','83','84'],'w');
        //console.log(board)
        return board
    }

    forEach(callback:(row:Hexagon[],index:number,array:Hexagon[][])=>void){
        this.board.forEach(callback);
    }

    /**
     * Retrieves the hexagon object based on an hexCoords
     * @param hex an hexagon object. Only to match hexCoords.
     * @returns hexagon
     */
    getHexByHexCoords(q:number,r:number,s:number){
        const hexagon = this.board.reduce((acc,row)=>{
            const filtered = row.reduce((acc,hexagon)=>{
                /// Compares coords.
                if (q === hexagon.hexCoords.q && r === hexagon.hexCoords.r && s === hexagon.hexCoords.s){
                    acc = hexagon;
                }
                return acc;
            },new Hexagon(0,0,0,-1,)); /// initialized as negative value to change if found.
            if (filtered.value != -1) {
                acc = filtered
            }
            return acc
        },new Hexagon(0,0,0,-1));
        if (hexagon.value === -1) return undefined
        return hexagon;
    }

    /**
     * Retrieves the hexagon in the cartesian coords (row,col)
     * @param row 
     * @param col 
     * @returns Hexagon object at the coordinates.
     */
    getHexByCoords(row:number,col:number){
        return this.board[row][col]
    }

    getNeighborsHexs(hex:Hexagon): Hexagon[]{
/*         const neightbours = Object.keys(this.direction_vectors).map((dirVect)=>{
            const {q:qVect,r:rVect,s:sVect} = this.direction_vectors[dirVect]
            const {q,r,s} = hex.hexCoords
            return this.getHexByHexCoords(q+qVect,r+rVect,s+sVect)
        }); */

        const neightbours = Object.keys(this.direction_vectors).reduce((acc:Hexagon[],dirVect)=>{
            const {q:qVect,r:rVect,s:sVect} = this.direction_vectors[dirVect]
            const {q,r,s} = hex.hexCoords
            const hexagon = this.getHexByHexCoords(q+qVect,r+rVect,s+sVect);
            if (hexagon) acc.push(hexagon)
            return acc
        },[]);
        return neightbours
    }

    getAt(coord:string){
        const row = parseInt(coord[0]);
        const col = parseInt(coord[1]);
        return this.getHexByCoords(row,col)
    }

    /**
     * 
     * @param hex an hexagon object. It can be a dummy one or one in the actual board.
     * @returns an array of all the neightbours of that hexagon hexCoords.
     */
    getNeighborsCoords(hex:Hexagon){
        const {q,r,s} = hex.hexCoords;
        const coords = Object.keys(this.direction_vectors).map((dirVect)=>{
            const neightborHex = this.direction_vectors[dirVect]
            const {q:qVect,r:rVect,s:sVect} = neightborHex
            const posibleHex = this.getHexByHexCoords(q+qVect,r+rVect,s+sVect)?.cartesianCoords
            return posibleHex;
        });
        return coords.filter((coord)=>{return coord != undefined })
    }
    
    getProyectedHexs(hex:Hexagon){
        console.log('getProyectedHexs')
        const hexagons:Hexagon[] = []
        Object.values(this.direction_vectors).forEach((hexVect:Hexagon)=>{
            let nextHex = this.nextInDir(hex,hexVect)
            console.log(nextHex?.coords)
            while (nextHex){ /// adds Hexs until the end of the board.
                hexagons.push(nextHex)
                nextHex = this.nextInDir(nextHex,hexVect)
            }
        });
        return hexagons
    }

    private nextInDir(hex:Hexagon,hexVect:Hexagon){
        const {q:qHex,r:rHex,s:sHex} = hex.hexCoords;
        const {q:qVect,r:rVect,s:sVect} = hexVect.hexCoords
        const nextHex = this.getHexByHexCoords(qHex+qVect,rHex+rVect,sHex+sVect);
        return nextHex;
    }

    private direction_vectors: {[key:string]:Hexagon} = {
            right: new Hexagon(1,0,-1),
            topRight: new Hexagon(1,-1,0),
            topLeft: new Hexagon(0,-1,1),
            left: new Hexagon(-1,0,1),
            bottomLeft: new Hexagon(-1,1,0),
            bottomRight: new Hexagon(0,1,-1)
        }

    setAtCoords(row:number,column:number,value:string|number){
        //console.log('setAtCoords',row,column)
        const hexagon = this.getHexByCoords(row,column);
        hexagon.value = value;
        return hexagon;
    }

    setAt(coord:string,value:string|number){
        const row = parseInt(coord[0]);
        const col = parseInt(coord[1]);
        return this.setAtCoords(row,col,value);
    }

    setMany(coords:string[], value:number|string){
        //console.log('setMany()')
        coords.forEach((coord)=>{
            const row = parseInt(coord[0]);
            const col = parseInt(coord[1]);
            this.setAtCoords(row,col,value)
        });
        return this.board
    }

    /**
     * for react reactivity. Return a new reference with a copy of the current board. 
     */
    getCopy(){
        const newBoard = new HexagonBoard(this.levels);
        const positions = this.getAllPositions();
        newBoard.setMany(positions['w'],'w');
        newBoard.setMany(positions['b'],'b');
        return newBoard;
    }

    /**
     * Get all positions with values != 0
     * @returns object {'w':strings[],'b':strings[]} : array of coords as strings 'rc' -> r: row, c:col.
     * return structure to facilitate setMany method.
     */
    getAllPositions(){
        let positions:{[key:string]:string} = {}
        this.board.forEach((hexagonsRow,rowIndex)=>{
            const rowObject = hexagonsRow.reduce((acc:{[key:string]:string},hexagon,columnIndex)=>{
                const coord = `${rowIndex}${columnIndex}`;
                if (hexagon.value === 'w') acc[coord] = 'w';
                else if (hexagon.value === 'b') acc[coord] = 'b';
                return acc
            },{});
            positions = {...positions,...rowObject}
        });
        const objectPositions = Object.keys(positions).reduce((acc:{[key:string]:string[]},coords:string)=>{
            acc[positions[coords]].push(coords)
            return acc
        },{'w':[],'b':[]});
        return objectPositions
    }
}

export default HexagonBoard;