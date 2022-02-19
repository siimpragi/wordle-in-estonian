import Row from "./Row";

const Board = ({ board, evaluations }) => {
  return (
    <div>
      {board.map((word, i) => (
        <Row key={i} word={word} states={evaluations[i]} />
      ))}
    </div>
  );
};

export default Board;
