import { useState, useEffect } from "react";
import { words } from "../static/words";
import Board from "./Board";

const Game = ({ game, submit }) => {
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput]);

  const handleKeyDown = (event) => {
    const { key } = event;
    handleKey(key);
  };

  const handleKey = (key) => {
    if (key === "Backspace") {
      setUserInput(userInput.slice(0, -1));
      return;
    }
    if (key === "Enter") {
      makeGuess();
      return;
    }
    if (userInput.length >= 5) {
      return;
    }
    const validLetters = "qwertyuiopüõasdfghjklöäzxcvbnmšž".split(""); // TODO: this is static
    if (validLetters.includes(key) === false) {
      return;
    }
    setUserInput(userInput.concat(key));
  };

  const makeGuess = () => {
    if (userInput.length !== 5) {
      alert("word has to be 5 letters");
      return;
    }
    if (words.indexOf(userInput) === -1) {
      alert("not a word");
      return;
    }
    submit(userInput);
    setUserInput("");
  };

  const { board, evaluations, status, rowIndex } = game;
  const shownBoard = board.concat();
  const shownEvaluations = evaluations.concat();
  if (status === "IN_PROGRESS") {
    shownBoard[rowIndex] = userInput;
    shownEvaluations[rowIndex] = userInput
      .padEnd(5, " ")
      .split("")
      .map((l) => (l !== " " ? "tbd" : "empty"));
  }

  return (
    <div>
      <Board board={shownBoard} evaluations={shownEvaluations} />
    </div>
  );
};

export default Game;
