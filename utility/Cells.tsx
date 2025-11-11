import { Cell, CellProps } from "@/app/type";
import React from "react";

const FlagComponent = ({
  undoFlag,
  cell,
}: {
  cell: Cell;
  undoFlag: (x: number, y: number) => void;
}) => {
  return (
    <div className="bg-[url(/flag.png)] w-full h-full bg-cover bg-center bg-no-repeat">
      <button
        className="w-full h-full"
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          undoFlag(cell.row, cell.col);
        }}
      />
    </div>
  );
};


const MineComponent = () => {
  return (
    <div className="bg-[url(/mine2.png)] w-full h-full bg-cover bg-center bg-no-repeat"></div>
  );
};


const SoilComponent = ({ cell }: { cell: Cell }) => {
  return (
    <>
      {cell.Mines === 0 ? (
        <div className="bg-[url(/soil.jpg)] w-full h-full bg-cover bg-center bg-no-repeat"></div>
      ) : (
        <div className="bg-[url(/soil.jpg)] w-full h-full bg-cover bg-center bg-opacity-75 bg-no-repeat z-[2] flex justify-center items-center text-[20px] font-bold text-red-500">
          <p className="z-[3]"> {cell.Mines}</p>
        </div>
      )}
    </>
  );
};

const CellComponent = ({ prop }: { prop: CellProps }) => {
  const { cell, cellModifier, flagModifier } = prop;
  const cellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`cell ${cell.row},${cell.col} clicked`);
    e.preventDefault();
    e.stopPropagation();
    if (!cell.isRevealed && !cell.isFlagged) {
      cellModifier(cell.row, cell.col);
    }
  };
  const flagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cell.isRevealed) {
      flagModifier(cell.row, cell.col);
    }
  };

  return (
    <div className="bg-[url(/cell.jpg)] w-full h-full bg-cover bg-center bg-no-repeat flex justfy-center items-center">
      <button
        className="w-full h-full"
        onClick={cellClick}
        onContextMenu={flagClick}
      ></button>
    </div>
  );
};

export { CellComponent, MineComponent, SoilComponent, FlagComponent };
