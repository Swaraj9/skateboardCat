import React, { useEffect, useRef, useState } from "react";
import { BiCheckCircle, BiCopy, BiReply } from "react-icons/bi";
import { MdRestartAlt } from "react-icons/md";

function App() {
  const catRef = useRef();
  const binRef = useRef();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [copied, setCopied] = useState(false);

  //method to add 'jump' class every '300ms' as the class jump css has jumping animation of 0.3s(300ms).
  //so on each key press we need to add animation and remove animation
  const jump = () => {
    if (!!catRef.current && catRef.current.classList != "jump") {
      catRef.current.classList.add("jump");
      setTimeout(function () {
        catRef.current.classList.remove("jump");
      }, 600);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      const catTop = parseInt(
        getComputedStyle(catRef.current).getPropertyValue("top")
      );

      let binLeft = parseInt(
        getComputedStyle(binRef.current).getPropertyValue("left")
      );
      
      let collisionCondition = window.innerHeight * 0.85 - 175 /* Cat Height */ - 25 - 90 /* Bin Height - 10 */ - 20;
      if(window.innerWidth < 700){
        collisionCondition = window.innerHeight * 0.93 - 100 - 25 - 50 - 20;
      }

      // detect collision
      if (
        binLeft < (window.innerWidth < 700 ? 110 : 185) &&
        binLeft > 0 &&
        catTop >= collisionCondition
      ) {
        // collision
        setFinalScore(score);
        setGameOver(true);
        setScore(0);
      } else {
        setScore(score + 0.1000);
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
      <div className="p-4 text-4xl max-md:text-xl max-md:p-2 items-center flex justify-between">
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
          <div className="flex text-3xl flex-col justify-center items-center h-full">
            <div
              onClick={() => setGameOver(false)}
              className="bg-[rgba(10,10,10,0.8)] rounded p-5 gap-2 flex items-center flex-col cursor-pointer"
            >
              <div>Game Over</div>
              <div>Score: {Math.round(finalScore)}</div>
              <div className="bg-white h-1 w-full rounded"/>
              <button className="flex items-center gap-2 mt-2">
                Retry <MdRestartAlt />
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <p className="bg-[rgba(10,10,10,0.8)] w-fit">Score : {Math.round(score)}</p>
            <div id="cat" ref={catRef}></div>
            <div id="bin" ref={binRef}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
