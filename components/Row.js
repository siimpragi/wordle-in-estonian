import Tile from "./Tile";

const Row = ({ word, evaluation }) => {
  const letters = word.padEnd(5, " ").split("");

  return (
    <div>
      {letters.map((letter, i) => {
        let state = "empty";
        if (evaluation) {
          state = evaluation[i];
        }
        return <Tile key={i} letter={letter} state={state} />;
      })}
    </div>
  );
};

export default Row;
