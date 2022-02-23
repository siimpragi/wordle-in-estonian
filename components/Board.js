import Row from "./Row";
import styles from "../styles/Board.module.css";

const Board = ({ board, evaluations }) => (
  <div className={styles.board}>
    {board.map((word, i) => (
      <Row key={i} word={word} evaluation={evaluations[i]} />
    ))}
  </div>
);

export default Board;
