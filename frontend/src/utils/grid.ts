export const grid = (col: number, row: number): object => {
  return {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridTemplateRows: `repeat(${row}, 1fr)`,
  };
};

export const gridToArray = (cols: number, rows: number): number[] => {
  const array = [];
  for (let i = 0; i < cols * rows; i++) {
    array.push(i);
  }
  return array;
};
