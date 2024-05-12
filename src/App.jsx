import React, { useEffect, useRef, useState } from "react";
import { BiCheckCircle, BiCopy } from "react-icons/bi";

function App() {
  //ref to get 'dino' html element in js
  const dinoRef = useRef();
  //ref to get 'cactus' html element in js
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [copied, setCopied] = useState(false);

  //method to add 'jump' class every '300ms' as the class jump css has jumping animation of 0.3s(300ms).
  //so on each key press we need to add animation and remove animation
  const jump = () => {
    if (!!dinoRef.current && dinoRef.current.classList != "jump") {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 400);
    }
  };

  //useEffect to track whether dino position and cactus position is intersecting
  //if yes, then game over.
  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current dino Y position
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current).getPropertyValue("top")
      );

      // get current cactus X position
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= (window.innerHeight * 0.85 - 50 - 25 - 40)) {
        // collision
        setFinalScore(score);
        setGameOver(true);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  //hook to call jump method on any keypress
  useEffect(() => {
    document.addEventListener("keydown", jump);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("1234567890");
    setCopied(true);
  };

  return (
    <div>
      <div className="p-4 text-4xl max-md:text-lg items-center flex justify-between">
        <div>Skateboard Cat</div>
        <div
          onClick={() => handleCopy()}
          className="z-20 p-2 px-4 max-md:text-lg max-md:p-1 max-md:px-2 text-2xl cursor-pointer w-fit bg-neutral-900 rounded"
        >
          <div className="flex items-center gap-2">
            CA: 1234567890{" "}
            {copied ? (
              <BiCheckCircle className=" text-green-500" />
            ) : (
              <BiCopy className=" text-sky-500" />
            )}
          </div>
        </div>
      </div>
      <div className="game" onTouchStart={() => jump()}>
        {gameOver ? (
          <div
            className="flex text-3xl flex-col justify-center items-center h-full cursor-pointer"
            onClick={() => setGameOver(false)}
          >
            <div className="bg-[rgba(10,10,10,0.8)] rounded p-5 gap-2 flex items-center flex-col">
              <div>Game Over</div>
              <div>Score: {finalScore}</div>
              <button>Retry</button>
            </div>
          </div>
        ) : (
          <div className="">
            <p className="bg-[rgba(10,10,10,0.8)] w-fit">Score : {score}</p>
            <div id="dino" ref={dinoRef}></div>
            <div id="cactus" ref={cactusRef}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
