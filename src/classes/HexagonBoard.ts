// https://www.redblobgames.com/grids/hexagons

import Hexagon from "./Hexagon";

class HexagonBoard {
    board : Hexagon[][];
    constructor(levels:number){ /// q-r-s.
        this.board = [];
        let aux = 0; /// to decrease the starting number.
        /// Every level will create a row.
        for (let r=-levels;r<=0;r++){ /// first half
            const row:Hexagon[] = [];
            for (let q=aux;q<=levels;q++){
                const s = levels-q+aux;
                //console.log(`q:${q} r:${r} s:${s}`)
                row.push(new Hexagon(q,r,s))
            }
            aux -= 1;
            this.board.push(row);
        }
        aux = 1
        for (let r=1;r<=levels;r++){
            const row: Hexagon[] = []
            for (let q=-levels;q<=levels-aux;q++){
                let s = (q+aux)*-1;
                if (s < 1 && s >-1) s = 0;
                row.push(new Hexagon(q,r,s))
            }
            aux += 1;
            this.board.push(row);
        }
    }

    forEach(callback:(row:Hexagon[],index:number,array:Hexagon[][])=>void){
        this.board.forEach(callback);
    }
}


export default HexagonBoard;