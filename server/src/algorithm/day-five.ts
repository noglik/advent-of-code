type Line = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};

const getCoordinatesFromString = (rawCoordinates: string) => {
  const [x, y] = rawCoordinates.split(',').map((n) => parseInt(n, 10));
  return { x, y };
};

export const parse = (input: string) =>
  input.split('\n').map((line) =>
    line.split(' -> ').reduce(
      (prev, rawCoordinates, i) => {
        if (i === 0) {
          prev.start = getCoordinatesFromString(rawCoordinates);
        } else {
          prev.end = getCoordinatesFromString(rawCoordinates);
        }

        return prev;
      },
      { start: {}, end: {} } as Line
    )
  );

export const getNumberOfMultipleOverlaps = (lines: Array<Line>, size = 1000) => {
  const oceanFloor = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  lines.forEach((line) => {
    // horizontal
    if (line.start.x === line.end.x) {
      const maxY = Math.max(line.start.y, line.end.y);
      const minY = Math.min(line.start.y, line.end.y);

      for (let i = minY; i <= maxY; i++) {
        oceanFloor[line.start.x][i] += 1;
      }
    }

    // vertical
    if (line.start.y === line.end.y) {
      const maxX = Math.max(line.start.x, line.end.x);
      const minX = Math.min(line.start.x, line.end.x);

      for (let i = minX; i <= maxX; i++) {
        oceanFloor[i][line.start.y] += 1;
      }
    }
  });

  return oceanFloor.reduce((prev, row) => prev + row.filter((point) => point >= 2).length, 0);
};
