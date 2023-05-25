interface Props {
    coord?:string,
}

interface HexagonInterface {
    q:number,
    r:number,
    s:number,
    value:number|string,
    row:number,
    col:number,
    get hexCoords():{q:number,r:number,s:number},
    get cartesianCoords():{row:number,col:number},
    get coords():string
}


export type {Props,HexagonInterface};