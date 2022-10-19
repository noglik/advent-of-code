import { expect } from 'chai';
import { calculateFishPopulation, parse } from './day-six';
import { day6Input as input } from '../../test/input';

describe('Day 6', function () {
  describe('parse', function () {
    it('should parse input string', function () {
      const parsedInput = parse(input);

      expect(parsedInput).to.have.length(300);
      expect(parsedInput[0]).to.be.eql(5);
    });
  });

  describe('calculateFishPopulation', function () {
    it('should calculate population after 18 days', function () {
      expect(calculateFishPopulation([3, 4, 3, 1, 2], 18)).to.be.eql(26);
    });

    it('should calculate population after 80 days', function () {
      const parsedInput = parse(input);
      expect(calculateFishPopulation(parsedInput)).to.be.eql(394994);
    });
  });
});
