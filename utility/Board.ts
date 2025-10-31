// ** Copyright Haoran Su, Boston University **

import { Cell } from "@/app/type";
const createGrid = (height: number, width: number, mines: number) => {
    const grid: Cell[][] = [];
    // initialize the grid
    for (let x = 0; x < height; x++){
        const row: Cell[] = [];
        for (let y =0; y< width; y++){
            row.push({
                row: x,
                col: y,
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                Mines: 0
            })
        }
        grid.push(row);
    }
    // place mines randomly
    const mine = []
    for (let i =0 ; i< mines; i++){
        const place = Math.random()* height * width;
        const x = Math.floor(place/ width);
        const y = Math.floor(place % width);
        if (!grid[x][y].isMine){
            grid[x][y].isMine = true;
            mine.push([x,y]);
        } else {
            i--;
        }
    } 
    // console.log(mine);
    // calculate adjacent mines
    const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
    for ( const m of mine){ 
        const mx = m[0];
        const my = m[1];
    for (const dir of directions){
        const newX = mx + dir[0];
        const newY = my + dir[1];
        if (newX >=0 && newX < height && newY >=0 && newY < width && !grid[newX][newY].isMine){
            grid[newX][newY].Mines +=1;
    }
} }
    return grid;
}
export default createGrid;