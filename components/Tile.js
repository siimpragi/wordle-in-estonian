const Tile = ({ letter, state }) => {
  const color = state === "tbd" || state === "empty" ? "black" : "white";
  const border =
    state === "tbd"
      ? "2px solid black"
      : state === "empty"
      ? "2px solid lightgray"
      : "";
  const backgroundColor =
    state === "absent"
      ? "gray"
      : state === "correct"
      ? "green"
      : state === "present"
      ? "goldenrod"
      : "white";
  const tileStyle = {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 4,
    textTransform: "uppercase",
    fontWeight: "bold",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    border,
    backgroundColor,
    color,
  };
  return <div style={tileStyle}>{letter}</div>;
};

export default Tile;
