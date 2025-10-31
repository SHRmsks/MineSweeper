  // ** Copyright Haoran Su, Boston University **
  import Denque from "denque";
  import { Cell, Tuple } from "@/app/type";

  const BFS = (grid: Cell[][], node: Tuple) => {
  let counter =0;
    const queue = new Denque();
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    queue.push(node);

    while (!queue.isEmpty()) {
      const current: Tuple = queue.shift();
      const x = current.x;
      const y = current.y;
      if (grid[x][y].isRevealed) {
        continue;
      }
      grid[x][y].isRevealed = true;
      counter +=1;
      if (grid[x][y].Mines > 0 ) {
        

        continue;
      }
      

      for (const dir of directions) {
        const newX = x + dir[0];
        const newY = y + dir[1];
        if (
          newX >= 0 &&
          newX < grid.length &&
          newY >= 0 &&
          newY < grid[0].length &&
          !grid[newX][newY].isRevealed &&
          !grid[newX][newY].isMine &&
          !grid[newX][newY].isFlagged
        ) {
          queue.push({ x: newX, y: newY });
        }
      }
    }
    return counter;
  };
  export default BFS;
