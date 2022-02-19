import Row from "./Row";

const Board = ({ board, evaluations }) => {
  return (
    <div>
      {board.map((word, i) => (
        <Row key={i} word={word} evaluation={evaluations[i]} />
      ))}
    </div>
  );
};

export default Board;
