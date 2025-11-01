// ** Copyright Haoran Su, Boston University **
"use client";
import "@/app/globals.css";

import { useCallback, useRef, useState } from "react";
import createGrid from "@/utility/Board";
import Board from "@/app/Board";
import { Cell } from "@/app/type";
import Input from "@/utility/Input";
import Game from "@/utility/Game";
const Main = () => {
  // we want define the board by ourselves,
  // what do we need? A useState that holds the board

  const [ready, setReady] = useState<boolean>(false);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const gameidRef = useRef<number>(0);
  console.log("currengameID", currentGame?.gameID);
  const readyClicker = useCallback((difficulty: string) => {
    switch (difficulty) {
      case "Easy": {
        setWidth(9);
        setHeight(9);
        setCurrentGame(new Game(`game-${++gameidRef.current}`, 71, "Easy"));
        setGrid(createGrid(9, 9, 10));
        setReady(true);
        break;
      }
      case "Medium": {
        setWidth(16);
        setHeight(16);
        setCurrentGame(new Game(`game-${++gameidRef.current}`, 216, "Medium"));
        setGrid(createGrid(16, 16, 40));
        setReady(true);
        break;
      }
      case "Hard": {
        setWidth(18);
        setHeight(20);
        setCurrentGame(new Game(`game-${++gameidRef.current}`, 310, "Hard"));
        setGrid(createGrid(20, 18, 50));
        setReady(true);
        break;
      }
      case "Expert": {
        setWidth(30);
        setHeight(16);
        setCurrentGame(new Game(`game-${++gameidRef.current}`, 381, "Expert"));
        setGrid(createGrid(16, 30, 99));
        setReady(true);
        break;
      }
      default: {
        break;
      }
    }
  }, []);
  const restartGame = useCallback(() => {
    readyClicker(currentGame!.difficulty);
  }, [currentGame, readyClicker]);

  // ** test grid logic **
  // for (let i = 0; i < grid.length; i++) {
  //   for (let j = 0; j < grid[0].length; j++) {
  //     console.log(`${grid[i][j].isMine}, ${grid[i][j].Mines} `);
  //   }
  //   console.log("\n");
  // }
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-y-[20px]">
      <div className="flex w-full h-[50px]  flex-row justify-center items-center text-[40px] gap-x-[10px] ">
        <img src="/mine.jpg" className="h-full"></img>
        <p className="font-titlefont text-title">MineSweeper</p>
      </div>
      {/*  my board setup */}
      {!ready ? (
        <div
          className="relative w-[30%] h-[70%] 
      justify-center items-center flex"
        >
          <div className="absolute rounded-3xl w-full h-full bg-[url('/theme.jpg')] opacity-60 bg-cover bg-no-repeat bg-center z-[-1]"></div>
          <Input selectionCallback={readyClicker} />
        </div>
      ) : (
        <div className="w-full h-[70%] flex justify-center items-center">
          <Board
            key={currentGame!.gameID}
            board={grid}
            height={height}
            width={width}
            game={currentGame!}
            restartCallback={restartGame}
          />
        </div>
      )}
    </div>
  );
};
export default Main;
