import { useState, useEffect } from "react";
import { solutions } from "../static/solutions";
import { saveGame, getSavedGame } from "../lib/data";
import { getNewGameWith } from "../lib/game";
import Head from "next/head";
import Game from "../components/Game";
import Countdown from "../components/Countdown";

export default function Home({ currentSolution, timestamps }) {
  const [game, setGame] = useState(getNewGameWith(currentSolution));
  useEffect(() => {
    const savedGame = getSavedGame();
    if (savedGame && savedGame.solution.number === game.solution.number) {
      setGame(savedGame);
    }
  }, [game.solution.number]);
  useEffect(() => {
    saveGame(game);
  }, [game]);

  const submit = (word) => {
    const letters = word.split("");
    const evaluation = letters.map((letter, i) => {
      if (game.solution.word[i] === letter) {
        return "correct";
      }
      if (game.solution.word.includes(letter)) {
        // TODO: prolly problematic if multiple same letters
        return "present";
      }
      return "absent";
    });

    const nextRowIndex = game.rowIndex + 1;
    const hasWon = !evaluation.find((state) => state !== "correct");
    const updatedStatus = hasWon
      ? "WIN"
      : nextRowIndex > 5
      ? "FAIL"
      : "IN_PROGRESS";

    const updatedBoard = game.board.concat();
    const updatedEvaluations = game.evaluations.concat();
    updatedBoard[game.rowIndex] = word;
    updatedEvaluations[game.rowIndex] = evaluation;

    const updatedGame = {
      ...game,
      board: updatedBoard,
      evaluations: updatedEvaluations,
      rowIndex: nextRowIndex,
      status: updatedStatus,
    };

    setGame(updatedGame);
  };

  return (
    <div>
      <Head>
        <title>wordle-in-estonian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Wordle {currentSolution.number} ({currentSolution.word}) -{" "}
          {game.status}
        </h1>

        <Game game={game} submit={submit} />

        <div>
          <h2>Next Wordle</h2>
          <Countdown toTs={timestamps.nextSolution} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const startTs = Number(process.env.START_TIMESTAMP);
  const secondsBetweenSolutions = Number(process.env.NEW_SOLUTION_AFTER);
  const nowTs = Math.round(new Date().getTime() / 1000);

  const secondsSinceStart = nowTs - startTs;
  const numberOfPastSolutions = Math.floor(
    secondsSinceStart / secondsBetweenSolutions
  );

  const getCurrentSolution = () => {
    let currentSolutionIndex = numberOfPastSolutions;
    // repeat old solutions if we've ran out of fresh ones
    while (currentSolutionIndex >= solutions.length) {
      currentSolutionIndex -= solutions.length;
    }
    return {
      word: solutions[currentSolutionIndex],
      number: currentSolutionIndex + 1,
    };
  };

  const nextSolutionTs =
    startTs +
    numberOfPastSolutions * secondsBetweenSolutions +
    secondsBetweenSolutions;

  return {
    props: {
      currentSolution: getCurrentSolution(),
      timestamps: {
        nextSolution: nextSolutionTs,
        page: nowTs,
      },
    },
  };
}
