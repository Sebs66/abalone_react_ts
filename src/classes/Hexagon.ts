class Hexagon {
    constructor(public q:number, public r:number, public s:number, public value:string|number=0){
        this.value = value
    }

    get coords(){
        return {q:this.q,r:this.r,s:this.s}
    }
}

export default Hexagon;