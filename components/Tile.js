import styles from "../styles/Board.module.css";

const Tile = ({ letter, state }) => (
  <div className={styles.tile} data-state={state}>
    {letter}
  </div>
);

export default Tile;
