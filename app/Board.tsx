// **copyright Haoran Su Boston University **
import BFS from "@/utility/BFS";
import { Cell } from "./type";
import Game from "@/utility/Game";
import { memo, useCallback, useRef, useState } from "react";
import {
  CellComponent,
  FlagComponent,
  MineComponent,
  SoilComponent,
} from "@/utility/Cells";
import { LoseBanner, RestartButton, WinBanner } from "@/utility/Banner";

// This is the whole board component that should encapsulate every thing about the current game
// It must self-sufficently manage the state of the board and trigger the re-rendering
const Board = ({
  board,
  height,
  width,
  game,
  restartCallback,
  nextLevelCallback,
}: {
  board: Cell[][];
  height: number;
  width: number;
  game: Game;
  restartCallback: () => void;
  nextLevelCallback: () => void;
}) => {
  // my board rendering logic
  const [win, setWin] = useState<boolean | null>(null);
  const [boardState, setBoardState] = useState<Cell[][]>(board);
  const gameState = useRef<Game>(game);
  const winChecker = useCallback((board: Cell[][]) => {
    if (gameState.current.checkWin()) {
      for (const row of board) {
        for (const cell of row) {
          if (
            (cell.isMine && !cell.isFlagged) ||
            (!cell.isMine && cell.isFlagged)
          ) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }, []);

  const undoFlag = useCallback((x: number, y: number) => {
    setBoardState((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[x][y].isFlagged = false;
      return newBoard;
    });
  }, []);

  const cellClicker = useCallback(
    (x: number, y: number) => {
      {
        setBoardState((prevBoard) => {
          // const newBoard = [...prevBoard];
          // newBoard[x][y].isRevealed = true; // this is wrong why? deep copy or shallow copy?
          const cell = prevBoard[x][y];
          // if mine, GG, reveal everything
          if (cell.isMine) {
            const newBoard = prevBoard.map((row) =>
              row.map((cell) => ({
                ...cell,
                isRevealed: true,
              }))
            );
            //set to lose
            setWin(false);
            console.log("Game Over!");
            return newBoard;
          }
          if (cell.isRevealed || cell.isFlagged) {
            return prevBoard;
          }

          const newBoard = prevBoard.map((row) =>
            row.map((cell) => ({ ...cell }))
          );
          if (cell.Mines === 0) {
            // perform BFS to reveal adjacent cells
            const counter = BFS(newBoard, { x: x, y: y });
            gameState.current.leftover -= counter;
            if (winChecker(newBoard)) {
              setWin(true);
              console.log("You win!");
            }
            console.log(gameState.current.leftover);
            return newBoard;
          }
          newBoard[x][y].isRevealed = true;
          gameState.current.leftover -= 1;
          if (winChecker(newBoard)) {
            setWin(true);
            console.log("You win!");
          }
          console.log(gameState.current.leftover);
          return newBoard;
        });
      }
    },
    [winChecker]
  );

  const flagClicker = useCallback((x: number, y: number) => {
    {
      setBoardState((prevBoard) => {
        const newBoard = prevBoard.map((row) =>
          row.map((cell) => ({ ...cell }))
        );
        newBoard[x][y].isFlagged = true;

        if (winChecker(newBoard)) {
          setWin(true);
          console.log("You win!");
        }
        return newBoard;
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-y-[30px]">
      {win !== null && (
        <div className="absolute w-full h-full flex justify-center items-center z-10">
          {win ? (
            <WinBanner
              restartCallback={restartCallback}
              nextLevelCallback={nextLevelCallback}
            />
          ) : (
            <LoseBanner restartCallback={restartCallback} />
          )}
        </div>
      )}
      <div
        className={`grid justify-center items-center gap-x-[3px] rounded-2xl gap-y-[3px] bg-gray-600 ${
          win !== null ? "opacity-50" : ""
        } overflow-hidden`}
        style={{
          gridTemplateRows: `repeat(${height}, 40px)`,
          gridTemplateColumns: `repeat(${width}, 40px)`,
          height: `${height * 40 + 3 * (height - 1)}px`,
          width: `${width * 40 + 3 * (width - 1)}px`,
        }}
      >
        {boardState.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            // ** conditional rendering logic **
            // if not revealed, is it flagged? if it's flagged, show flagged button component

            return boardState[rowIndex][colIndex].isRevealed ? (
              boardState[rowIndex][colIndex].isMine ? (
                <MineComponent key={`${rowIndex}-${colIndex}`} />
              ) : (
                <SoilComponent key={`${rowIndex}-${colIndex}`} cell={cell} />
              )
            ) : boardState[rowIndex][colIndex].isFlagged ? (
              <FlagComponent
                key={`${rowIndex}-${colIndex}`}
                undoFlag={undoFlag}
                cell={cell}
              />
            ) : (
              <CellComponent
                key={`${rowIndex}-${colIndex}`}
                prop={{
                  cell: cell,
                  cellModifier: cellClicker,
                  flagModifier: flagClicker,
                }}
              />
            );
          });
        })}
      </div>
      {win == null ? <RestartButton restartCallback={restartCallback} /> : null}
    </div>
  );
};
export default memo(Board);
