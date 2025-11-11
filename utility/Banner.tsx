import React, { useEffect, useState } from "react";
const RestartButton = React.memo(function Rb({
  restartCallback,
}: {
  restartCallback: () => void;
}) {
  return (
    <button
      className="relative w-[100px] font-selection text-selection bg-blue-200 z-20 rounded-3xl"
      onClick={restartCallback}
    >
      Restart
    </button>
  );
});
const NextLeveLButton = React.memo(function Nlb({
  nextLevelCallback,
}: {
  nextLevelCallback: () => void;
}) {
  return (
    <button
      className="relative w-[100px] font-selection text-selection bg-blue-200 z-20 rounded-3xl"
      onClick={nextLevelCallback}
    >
      Next Level!
    </button>
  );
});

const WinBanner = React.memo(function Wb({
  restartCallback,
  nextLevelCallback,
}: {
  restartCallback: () => void;
  nextLevelCallback: () => void;
}) {
  return (
    <div className="relative flex flex-col justify-center items-center  p-[30px] gap-x-[10px] rounded-3xl overflow-hidden text-[#e1e7eb]">
      <div className="absolute inset-0 bg-cover opacity-80 bg-[url('/win_banner.png')] bg-center text-[30px] bg-no-repeat z-1"></div>
      <img
        className="relative w-[100px] h-[100px] z-10"
        src="/cup.png"
        alt="win"
      />
      <p className="relative z-10 text-[30px] text-pretty">
        Congratulations, you found all mines!!
      </p>
      <div className="z-10 flex flex-row gap-x-[15px]">
        <RestartButton restartCallback={restartCallback} />
        <NextLeveLButton nextLevelCallback={nextLevelCallback} />
      </div>
    </div>
  );
});

const LoseBanner = React.memo(function Lb({
  restartCallback,
}: {
  restartCallback: () => void;
}) {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const timeID = setTimeout(() => {
      setReveal(true);
    }, 1500);
    return () => {
      clearTimeout(timeID);
    };
  }, []);

  return reveal ? (
    <div className="relative flex flex-col rounded-3xl overflow-hidden justify-center items-center p-[30px] gap-[10px] animate-popIn text-[#ee0505]">
      <div className="absolute inset-0 bg-cover z-1 bg-[url('/lose_banner.png')] bg-center bg-no-repeat opacity-60"></div>
      <div className="flex text-[30px] font-selection flex-row justify-between items-center">
        <img
          className=" relative z-10 w-[100px] h-[100px]"
          src="/bomb.png"
          alt="lose"
        ></img>
        <p className="relative z-10">Game Over</p>
      </div>
      <p className="relative z-10 text-[30px] font-selection">
        You Hitted The Bomb!!
      </p>
      <div className="z-10">
        <RestartButton restartCallback={restartCallback} />
      </div>
    </div>
  ) : null;
});

export { WinBanner, LoseBanner, RestartButton, NextLeveLButton };
