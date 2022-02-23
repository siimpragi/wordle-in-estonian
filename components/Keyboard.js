import styles from "../styles/Keyboard.module.css";
const layout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "ü", "õ"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "š", "ž", "Backspace"],
];

const Keyboard = ({ board, evaluations, handleKey }) => {
  const letterStates = {};
  // TODO: do letterStates more clearly
  board.forEach((word, i) => {
    word.split("").forEach((letter, j) => {
      letterStates[letter] = evaluations[i][j];
    });
  });

  return (
    <div className={styles.keyboard}>
      {layout.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((keyName, i) => (
            <Key
              key={i}
              keyName={keyName}
              state={letterStates[keyName]}
              onClick={() => handleKey(keyName)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Key = ({ keyName, state, onClick }) => {
  const label = keyName === "Backspace" ? "⌫" : keyName;
  return (
    <button
      className={`${styles.key} ${
        keyName === "Enter" || keyName === "Backspace" ? styles.wide : ""
      }`}
      data-state={state}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Keyboard;
