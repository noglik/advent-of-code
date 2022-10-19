import { expect } from 'chai';
import { getNumberOfMultipleOverlaps, parse } from './day-five';
import { day5Input as input } from '../../test/input';

describe('Day 5', function () {
  describe('parse', function () {
    it('should parse input string', function () {
      const parsedInput = parse(input);

      expect(parsedInput).to.have.length(500);
      expect(parsedInput[0]).to.be.eql({ start: { x: 35, y: 968 }, end: { x: 974, y: 29 } });
    });
  });

  describe('getNumberOfMultipleOverlaps', function () {
    it('should return sum of multiple overlaps(2 and higher)', function () {
      const parsedInput = parse(input);

      expect(getNumberOfMultipleOverlaps(parsedInput)).to.be.eql(7380);
    });
  });
});
