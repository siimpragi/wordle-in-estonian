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
    <div>
      {layout.map((row, i) => (
        <div key={i}>
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
  const color =
    state === "absent" || state === "correct" || state === "present"
      ? "white"
      : "black";
  const backgroundColor =
    state === "absent"
      ? "gray"
      : state === "correct"
      ? "green"
      : state === "present"
      ? "goldenrod"
      : "lightgray";
  const keyStyle = {
    minWidth: keyName === "Enter" || keyName === "Backspace" ? 80 : 40,
    height: 60,
    margin: 2,
    borderRadius: 4,
    textTransform: "uppercase",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor,
    color,
  };

  const label = keyName === "Backspace" ? "⌫" : keyName;
  return (
    <button style={keyStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default Keyboard;
