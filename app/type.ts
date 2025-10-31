interface Tuple{
    x: number;
    y: number;
}

interface Cell{
    isMine:boolean;
    isRevealed: boolean;
    isFlagged: boolean; 
    Mines: number;
    row: number;
    col: number;
}
enum Difficulty {
    Easy,
    Medium,
    Hard,
    Expert
}
interface CellProps{
    cell: Cell;
    cellModifier: (x: number, y: number)  => void;
    flagModifier: (x: number, y: number)  => void;
}
export type {Tuple, Cell, CellProps};
export {Difficulty};