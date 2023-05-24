class Hexagon {
    constructor(
        public q:number, 
        public r:number, 
        public s:number, 
        public value:string|number=0, 
        public row:number=0, 
        public col:number=0)
        {
        this.value = value
    }

    get hexCoords(){
        return {q:this.q,r:this.r,s:this.s}
    }
    get Coords(){
        return `${this.row}${this.col}`
    }

    get cartesianCoords(){
        return {row:this.row,col:this.col}
    }
}

export default Hexagon;