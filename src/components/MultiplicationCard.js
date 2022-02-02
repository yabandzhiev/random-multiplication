import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MultiplicationCard = () => {
  const random = () => {
    let randomNumber = Math.floor(Math.random() * 11) + 2;
    return randomNumber;
  };

  let [playAgain, setPlayAgain] = useState(false);
  let [aRandom, setARandom] = useState(random());
  let [bRandom, setBRandom] = useState(random());
  let [allAnswers, setAllAnswers] = useState([]);

  let distractArr = [];

  const reset = () => {
    let answer = aRandom * bRandom;

    distractArr.push(answer);

    const distractors = (i) => {
      if (i < 3) {
        return answer + random();
      } else {
        return answer - random();
      }
    };

    for (let i = 1; i <= 5; i++) {
      distractArr.push(distractors(i));
    }

    let currentIndex = distractArr.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = distractArr[currentIndex];
      distractArr[currentIndex] = distractArr[randomIndex];
      distractArr[randomIndex] = temporaryValue;
    }

    setAllAnswers(distractArr);
  };

  useEffect(() => {
    setARandom((aRandom = random()));
    setBRandom((bRandom = random()));
    setAllAnswers([]);
    distractArr = [];
    reset();
  }, [playAgain]);

  let [success, setSuccess] = useState(false);
  let [message, setMessage] = useState("");

  function handleClick(e) {
    if (Number(e.target.textContent) === aRandom * bRandom) {
      setSuccess(true);
      setMessage("Play Again?");
      e.target.style.background = "#4254bc";
    } else {
      e.target.textContent = "";
      e.target.disabled = true;
      setMessage("Incorrect");
    }
  }

  return (
    <div className="container-el">
      <div id="flashcard-el">
        <div className="row-el">
          <span id="a">{aRandom}</span>
        </div>
        <div className="row-el">
          <span id="x">x</span>
          <span id="b">{bRandom}</span>
        </div>

        <div className="row-el">
          <div id="divider-el"></div>
        </div>

        <div className="row-el2">
          {message &&
            (success ? (
              <div
                onClick={() => (playAgain ? setPlayAgain(false) : setPlayAgain(true))}
                id="again"
                className="button-el"
                style={{ backgroundColor: "#546fc3" }}
              >
                {message}
              </div>
            ) : (
              <div id="msg" className="button-el" style={{ backgroundColor: "red" }}>
                {message}
              </div>
            ))}
        </div>

        <div className="row-el">
          {allAnswers.slice(0, 3).map((answer) => {
            return (
              <button
                className="square-el"
                onClick={(e) => handleClick(e)}
                key={uuidv4()}
              >
                {answer}
              </button>
            );
          })}
        </div>
        <div className="row-el">
          {allAnswers.slice(3, 6).map((answer) => {
            return (
              <button
                className="square-el"
                onClick={(e) => handleClick(e)}
                key={uuidv4()}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultiplicationCard;
