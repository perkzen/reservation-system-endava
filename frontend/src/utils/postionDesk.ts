export const positionDesk = (squares: number, position: number): boolean => {
  for (let i = 0; i < squares; i++) {
    if (i === position) return true;
  }
  return false;
};
