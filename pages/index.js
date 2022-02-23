import { useState, useEffect } from "react";
import { solutions } from "../static/solutions";
import {
  saveGame,
  getSavedGame,
  saveStatistics,
  getSavedStatistics,
} from "../lib/data";
import { getNewGameWith } from "../lib/game";
import { getEmptyStatistics } from "../lib/statistics";
import Head from "next/head";
import Image from "next/image";
import Game from "../components/Game";
import Modal from "../components/Modal";
import Statistics from "../components/Statistics";
import Help from "../components/Help";

export default function Home({ currentSolution, timestamps }) {
  const [game, setGame] = useState(getNewGameWith(currentSolution));
  const [statistics, setStatistics] = useState(getEmptyStatistics());
  const [showInModal, setShowInModal] = useState(null);
  useEffect(() => {
    const savedGame = getSavedGame();
    const savedStatistics = getSavedStatistics();
    if (savedGame === null && savedStatistics === null) {
      setShowInModal("help");
    }
    if (savedGame && savedGame.solution.number === game.solution.number) {
      setGame(savedGame);
    }
    if (savedStatistics) {
      setStatistics(savedStatistics);
    }
  }, [game.solution.number]);
  useEffect(() => {
    saveGame(game);
  }, [game]);
  useEffect(() => {
    saveStatistics(statistics);
  }, [statistics]);

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

    // TODO: really need to split this method in two and move into lib
    // TODO: this whole thing is starting to look horrible...
    if (updatedStatus === "IN_PROGRESS") {
      return;
    }

    const updatedGuesses = { ...statistics.guesses };
    if (updatedStatus === "FAIL") {
      updatedGuesses["fail"] += 1;
    } else {
      const numberOfGuesses = updatedBoard.filter((word) => word !== "").length;
      updatedGuesses[numberOfGuesses] += 1;
    }
    const updatedGamesPlayed = statistics.gamesPlayed + 1;
    const updatedGamesWon =
      updatedStatus === "WIN" ? statistics.gamesWon + 1 : statistics.gamesWon;
    const updatedWinPercentage = Math.round(
      (updatedGamesWon * 100) / updatedGamesPlayed
    );

    const updatedStatistics = {
      ...statistics,
      guesses: updatedGuesses,
      winPercentage: updatedWinPercentage,
      gamesPlayed: updatedGamesPlayed,
      gamesWon: updatedGamesWon,
    };

    setStatistics(updatedStatistics);
  };

  return (
    <div>
      <Head>
        <title>Wordle eesti keeles</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* TODO: should rename the env var now */}
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_SHARE_URL}/og-image.png`}
        />
      </Head>

      <header>
        <button onClick={() => setShowInModal("help")}>
          <Image
            src="/question-circle-fill.svg"
            alt="Abi"
            width={24}
            height={24}
          />
        </button>
        <h1>
          Wordle eesti keeles <span>#{currentSolution.number}</span>
        </h1>
        <button onClick={() => setShowInModal("statistics")}>
          <Image
            src="/bar-chart-fill.svg"
            alt="Statistika"
            width={24}
            height={24}
          />
        </button>
      </header>

      <main>
        <Game game={game} submit={submit} />

        {showInModal !== null && (
          <Modal handleClose={() => setShowInModal(null)}>
            {showInModal === "help" && <Help />}
            {showInModal === "statistics" && (
              <Statistics
                statistics={statistics}
                game={game}
                nextSolutionTs={timestamps.nextSolution}
              />
            )}
          </Modal>
        )}
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
