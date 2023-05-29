// https://www.redblobgames.com/grids/hexagons

import Hexagon from "./Hexagon";

class HexagonBoard {
    board : Hexagon[][];
    directions = ['right','topRight','topLeft','left','bottomLeft','bottomRight'];
    
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
    
    getFirstEmptyHexsPerDir(hex:Hexagon){
        /// Vamos a cambiarlo para que nos entregue el resultado por dirección. Luego será más fácil hacer otros cálculos.
        console.log('getProyectedHexs')
        const hexagons:Hexagon[] = []
        Object.values(this.direction_vectors).forEach((hexVect:Hexagon)=>{
            let nextHex = this.nextInDir(hex,hexVect)
            console.log(nextHex?.coords)
            while (nextHex){ /// adds Hexs until the end of the board.
                if (!nextHex.value){ /// look if its empty.
                    hexagons.push(nextHex)
                    break
                }
                nextHex = this.nextInDir(nextHex,hexVect)
            }
        });
        return hexagons
    }

    /**
     * Original function. Gives all proyected hex in the 6 directions one array.
     * @param hex 
     * @returns 
     */
    getAllProyectedHex(hex:Hexagon){
        //console.log('getProyectedHexs')
        const hexagons:Hexagon[] = []
        Object.values(this.direction_vectors).forEach((hexVect:Hexagon)=>{
            let nextHex = this.nextInDir(hex,hexVect)
            //console.log(nextHex?.coords)
            while (nextHex){ /// adds Hexs until the end of the board.
                hexagons.push(nextHex)
                nextHex = this.nextInDir(nextHex,hexVect)
            }
        });
        return hexagons
    }

    getProyectedHexsPerDir(hex:Hexagon){
        /// Give all hex until a empty space is encounter or end of board.
        const hexagonsPerDir: {[key:string]:(Hexagon|undefined)[]} = {}
        Object.keys(this.direction_vectors).forEach((dirString:string)=>{
            const dirVect = this.direction_vectors[dirString];
            let nextHex = this.nextInDir(hex,dirVect);
            if (!hexagonsPerDir[dirString]) hexagonsPerDir[dirString] = [];
            while (nextHex){
                hexagonsPerDir[dirString].push(nextHex);
                nextHex = this.nextInDir(nextHex,dirVect);
            }
            hexagonsPerDir[dirString].push(undefined) //* marks the end of the board.
        });
        return hexagonsPerDir
    }

    /**
     * Receives an array with hexes in only one direction. undefined flags the end of the board.
     * @param hexes 
     * Returns the posible hex move in that direction.
     */
    calculateMovesInStraightDir(activeHex:Hexagon,hexes:(Hexagon|undefined)[]){
        /// If next ball is opponnent or undefined, no movement.
        /// If next are same team, but more than 2, no movement.
        /// If next are same team < 2 & then an empty, movement.
        /// If next are same team < 2 and next opponent. See if opponent is < 2 and return movement if same > opponent
        let continuosSameTeam = 0;
        let continuosOpponentTeam = 0;
        let prev = 'same' /// flags current to reset if needed.
        let availableHexagon:Hexagon|undefined;
        let firstOpponentHex:Hexagon|undefined;
        //console.log('hexes',hexes)
        for (const hex of hexes){
            if (!hex && prev=='same'){
                availableHexagon = undefined;
                //console.log('end of board')
                break;
            }
            else if (hex && hex.value == activeHex.value && prev=='same'){ /// Same team
                //console.log('SameTeam');
                continuosSameTeam += 1;
                availableHexagon = hex;
            }
            else if (hex && hex.value == activeHex.value && prev!= 'same'){ /// If same team after opponent team.
                continuosSameTeam = 0;
                availableHexagon = undefined /// cannot move.
                break; 
            }
            else if (hex && hex.value != 0 && hex.value != activeHex.value) { /// Opponent
                //console.log('OpponentTeam')
                continuosOpponentTeam += 1;
                if (!firstOpponentHex) firstOpponentHex = hex; /// Saves first opponent encounter.
                prev = 'opponent' /// Updates flag.
                availableHexagon = hex
            }
            else{ /// Empty stop.
                //console.log('empty!')
                //console.log('continuosSameTeam',continuosSameTeam,'continuosOpponentTeam',continuosOpponentTeam);
                if (continuosOpponentTeam && (continuosSameTeam+1) > continuosOpponentTeam){
                    availableHexagon = firstOpponentHex;
                    break
                }
                availableHexagon = hex;
                break;
            }
        }

        if (continuosSameTeam >2 || continuosOpponentTeam > 2) return undefined
        if (continuosSameTeam == 0 && continuosOpponentTeam > 0) return undefined
        return availableHexagon
    }

    getProyectedHexsByTypePerDir_DEPRECATED(hex:Hexagon){ //! DEPRECATED.
        console.log('DEPRECATED')
        /// Give all hex until a empty space is encounter or end of board.
        const hexagonsPerDir: {[key:string]:Hexagon[]} = {}
        Object.keys(this.direction_vectors).forEach((dirString:string)=>{
            const dirVect = this.direction_vectors[dirString];
            let nextHex = this.nextInDir(hex,dirVect);
            while (nextHex){
                if (!hexagonsPerDir[dirString]) hexagonsPerDir[dirString] = [];
                hexagonsPerDir[dirString].push(nextHex);
                nextHex = this.nextInDir(nextHex,dirVect);
            }
        });

        const infoPerDir:{[key:string]:{[key:string]:Hexagon[]}} = {}
        /// Calculate per both ways dir, up to 3 spots.
        Object.keys(hexagonsPerDir).forEach((dirString)=>{
            const hexsPerDir = hexagonsPerDir[dirString];
            const opponentContinuousHexs:Hexagon[] = [];
            const sameContinuousHexs:Hexagon[] = [];
            const emptyContinuousHex: Hexagon[] =[]; /// This is different. stops at the first empty spot, but ignores same team.
            for (const hexPerDir of hexsPerDir){ /// Opponents.
                if (!hexPerDir.value || hexPerDir.value === hex.value) break /// Exit as soon as no opponent is encounter.
                opponentContinuousHexs.push(hexPerDir);
            }
            for (const hexPerDir of hexsPerDir){ /// Same Team.
                if (hexPerDir.value !== hex.value) break;
                sameContinuousHexs.push(hexPerDir);
            }
            for (const hexPerDir of hexsPerDir){ /// Empty
                if (hexPerDir.value && hexPerDir.value !== hex.value) break; /// If we encounter an opponent.
                if (!hexPerDir.value){
                    emptyContinuousHex.push(hexPerDir);
                    break; /// Exit after first empy spot.
                }

            }
            infoPerDir[dirString] = {
                'opponent':opponentContinuousHexs,
                'same': sameContinuousHexs,
                'empty': emptyContinuousHex
            }
        });
        return infoPerDir
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

    attack(activeHex:Hexagon,attackedHex:Hexagon){
        const direction = this.getDirectionOf(activeHex,attackedHex);
        if (!direction) return
        console.log(direction)
        console.log('activeHex',activeHex.value)
        const temp = attackedHex.value
        this.setAt(attackedHex.coords,activeHex.value);
        this.setAt(activeHex.coords,0);

        
        /// Find the next empty or undefined behind attacked piece.
        let nextPiece:Hexagon|undefined = attackedHex;
        while (nextPiece){
            nextPiece = this.nextInDir(nextPiece,this.direction_vectors[direction]);
            if (!nextPiece) break
            if (nextPiece.value === 0){
                this.setAt(nextPiece.coords,temp)
                break
            }
        }
        console.log(this.board)
        return this;
    }

    getDirectionOf(hex1:Hexagon,hex2:Hexagon){
        let hexEqualCoord: string|undefined = undefined; 
        for (const key in hex1.hexCoords){
            if (Object.keys(hex2.hexCoords).includes(key) && hex2.hexCoords[key as 'q'|'r'|'s'] === hex1.hexCoords[key as 'q'|'r'|'s']){
                //console.log(`Propiedad ${key} es igual`)
                hexEqualCoord = key
            }
        }
        if (hexEqualCoord === 'q'){
            if (hex1.coords > hex2.coords) return 'topLeft'
            return 'bottomRight'
        } else if (hexEqualCoord === 'r'){
            if (hex1.coords > hex2.coords) return 'left'
            return 'right'
        } else if (hexEqualCoord === 's'){
            if (hex1.coords > hex2.coords) return 'topRight'
            return 'bottomLeft'
        } else return undefined
    }
}

export default HexagonBoard;