import { parse as parseDay4, playBingo } from './day-four';
import { parse as parseDay5, getNumberOfMultipleOverlaps } from './day-five';
import { parse as parseDay6, calculateFishPopulation } from './day-six';

export const calculateResultForDay = (input: string, day: 4 | 5 | 6) => {
  switch (day) {
    case 4:
      try {
        return playBingo(parseDay4(input));
      } catch (e) {
        throw Error('Incorrect input for day 4');
      }
    case 5:
      try {
        return getNumberOfMultipleOverlaps(parseDay5(input));
      } catch (e) {
        throw Error('Incorrect input for day 5');
      }
    case 6:
      try {
        return calculateFishPopulation(parseDay6(input));
      } catch (e) {
        throw Error('Incorrect input for day 6');
      }
    default:
      throw Error('Unsupported day(supported: 4, 5, 6)');
  }
};
