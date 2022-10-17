export const parse = (input: string) => input.split(',').map((n) => parseInt(n, 10));

export const calculateFishPopulation = (initialState: Array<number>, after = 80) => {
  const growthHash = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  } as Record<number, number>;

  initialState.forEach((age) => {
    growthHash[age] += 1;
  });

  for (let i = 0; i < after; i++) {
    growthHash[9] = growthHash[0]; // in next loop will move newborn to 8
    growthHash[7] += growthHash[0]; // in next loop will move happy parent to 6
    growthHash[0] = 0;

    for (let j = 0; j < 9; j++) {
      growthHash[j] = growthHash[j + 1];
      growthHash[j + 1] = 0;
    }
  }

  return Object.values(growthHash).reduce((prev, cur) => prev + cur, 0);
};
