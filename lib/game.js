export const getNewGameWith = (solution) => {
  return {
    solution,
    board: ["", "", "", "", "", ""],
    evaluations: [null, null, null, null, null, null],
    rowIndex: 0,
    status: "IN_PROGRESS",
  };
};
