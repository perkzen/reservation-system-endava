export const applyGridSize = (col: number, row: number): object => {
  return {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridTemplateRows: `repeat(${row}, 1fr)`,
  };
};
