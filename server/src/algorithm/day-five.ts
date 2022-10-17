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

const addCoordinates = (oceanFloor: Record<string, number>, key: string) => {
  if (key in oceanFloor) {
    oceanFloor[key] += 1;
  } else {
    oceanFloor[key] = 1;
  }

  return oceanFloor;
};

const getMinMax = (a: number, b: number) => (a === Math.min(a, b) ? [a, b] : [b, a]);

export const getNumberOfMultipleOverlaps = (lines: Array<Line>) => {
  let oceanFloor = {} as Record<string, number>;

  lines.forEach((line) => {
    // horizontal
    if (line.start.x === line.end.x) {
      const [minY, maxY] = getMinMax(line.start.y, line.end.y);

      for (let i = minY; i <= maxY; i++) {
        oceanFloor = addCoordinates(oceanFloor, `${line.start.x},${i}`);
      }
    }

    // vertical
    if (line.start.y === line.end.y) {
      const [minX, maxX] = getMinMax(line.start.x, line.end.x);

      for (let i = minX; i <= maxX; i++) {
        oceanFloor = addCoordinates(oceanFloor, `${i},${line.start.y}`);
      }
    }
  });

  return Object.values(oceanFloor).filter((overlap) => overlap >= 2).length;
};
