interface Props {
    coord?:string,
}

interface HexagonInterface {
    q:number,
    r:number,
    s:number,
    value:number,
    row:number,
    col:number,
    hexCoords():()=>{q:number,r:number,s:number},
    cartesianCoords():()=>{row:number,col:number}
}


export type {Props,HexagonInterface};