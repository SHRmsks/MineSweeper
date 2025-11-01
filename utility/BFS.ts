  // ** Copyright Haoran Su, Boston University **
  import Denque from "denque";
import { Cell, Tuple } from "@/app/type";

  const BFS = (grid: Cell[][], node: Tuple) => {
    //  this counter countrs how many cells will be revealed after one cascade
    let counter =0;
    // we will need a queue, but need a O(1) queue instead of array
    const queue = new Denque();
    // this is the connection of any node's neighbors, we know it always be this 8 directions
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
    // we start from this node and push it into the queue
    queue.push(node);

    while (!queue.isEmpty()) {
      // pop the front node, this is O(1)
      const current: Tuple = queue.shift();
      const x = current.x;
      const y = current.y;
      // the current node x and y
      // we need to check if this node is already revealed, which is considered visited, we must stop and skip any further expansion
      if (grid[x][y].isRevealed) {
        continue;
      }
      // otherwise, reveal this node
      grid[x][y].isRevealed = true;
      // increase the revealed counter
      counter +=1;
      // if the node has mines around, we stop the expansion
      if (grid[x][y].Mines > 0 ) {
        continue;
      }
      // otherwise, we must expand to all its neighbors
      for (const dir of directions) {
        const newX = x + dir[0];
        const newY = y + dir[1];
        // the neighbor's x and y
        //  check if the neighbor is within the grid and not revealed, not flagged and not mine
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
