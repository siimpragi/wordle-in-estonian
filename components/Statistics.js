import styles from "../styles/Statistics.module.css";
import Countdown from "./Countdown";

const Statistics = ({ statistics, game, nextSolutionTs }) => {
  const { gamesPlayed, gamesWon, winPercentage } = statistics;
  console.log(statistics);
  return (
    <div className={styles.container}>
      <h1>Statistika</h1>

      <div className={styles.subContainer}>
        <div>
          <h2 className={styles.subTitle}>Mängitud</h2>
          <div>{gamesPlayed}</div>
        </div>
        <div>
          <h2 className={styles.subTitle}>Võidetud</h2>
          <div>
            {gamesWon} ({winPercentage}%)
          </div>
        </div>
      </div>

      {game.status !== "IN_PROGRESS" && (
        <div className={styles.subContainer}>
          <div>
            <h2 className={styles.subTitle}>Järgmine mäng</h2>
            <Countdown toTs={nextSolutionTs} />
          </div>
          <div>
            <h2 className={styles.subTitle}>Jaga viimast tulemust</h2>
            <ShareButton game={game} />
          </div>
        </div>
      )}
    </div>
  );
};

const ShareButton = ({ game }) => {
  const { evaluations, status, solution } = game;

  const shareUrl = process.env.NEXT_PUBLIC_SHARE_URL
    ? `https://${process.env.NEXT_PUBLIC_SHARE_URL}`
    : "";

  const guesses = evaluations.filter((e) => e !== null).length;

  const emojis = evaluations
    .map((evaluation) => {
      if (evaluation === null) {
        return "";
      }
      const rowEmojis = evaluation
        .map((state) => {
          if (state === "correct") {
            return "🟩";
          }
          if (state === "present") {
            return "🟨";
          }
          return "⬜";
        })
        .join("");
      return `${rowEmojis}\n`;
    })
    .join("");

  const shareText = `${shareUrl} #${solution.number} ${
    status === "FAIL" ? "X" : guesses
  }/6\n\n${emojis}`;

  return (
    <button onClick={() => navigator.clipboard.writeText(shareText)}>
      kopeeri lõikelauale
    </button>
  );
};

export default Statistics;
