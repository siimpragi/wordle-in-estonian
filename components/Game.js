import { useState, useEffect } from "react";
import { words } from "../static/words";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Toast from "./Toast";

const Game = ({ game, submit }) => {
  const [userInput, setUserInput] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    const { key } = event;
    handleKey(key);
  };

  const handleKey = (key) => {
    if (game.status !== "IN_PROGRESS") {
      return;
    }
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

  const showToast = (message) => {
    // TODO: toasts should be set into an array probably
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const makeGuess = () => {
    if (userInput.length < 5) {
      showToast("not enough letters");
      return;
    }
    if (words.indexOf(userInput) === -1) {
      showToast("not in wordlist");
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
      <Keyboard board={board} evaluations={evaluations} handleKey={handleKey} />
      <Toast message={toastMessage} />
    </div>
  );
};

export default Game;
