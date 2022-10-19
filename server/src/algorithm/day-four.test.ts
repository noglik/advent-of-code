import { expect } from 'chai';
import { isWon, markDrawnNumber, parse, playBingo, sumUnmarked } from './day-four';
import { day4Input as input } from '../../test/input';

describe('Day 4', function () {
  describe('parse', function () {
    it('should parse input string', function () {
      const { drawn, boards } = parse(input);
      expect(drawn).to.be.eql([
        1, 76, 38, 96, 62, 41, 27, 33, 4, 2, 94, 15, 89, 25, 66, 14, 30, 0, 71, 21, 48, 44, 87, 73,
        60, 50, 77, 45, 29, 18, 5, 99, 65, 16, 93, 95, 37, 3, 52, 32, 46, 80, 98, 63, 92, 24, 35,
        55, 12, 81, 51, 17, 70, 78, 61, 91, 54, 8, 72, 40, 74, 68, 75, 67, 39, 64, 10, 53, 9, 31, 6,
        7, 47, 42, 90, 20, 19, 36, 22, 43, 58, 28, 79, 86, 57, 49, 83, 84, 97, 11, 85, 26, 69, 23,
        59, 82, 88, 34, 56, 13,
      ]);

      expect(boards[0]).to.be.eql([
        [85, 23, 65, 78, 93],
        [27, 53, 10, 12, 26],
        [5, 34, 83, 25, 6],
        [56, 40, 73, 29, 54],
        [33, 68, 41, 32, 82],
      ]);
    });
  });

  describe('markDrawnNumber', function () {
    it('should change matched number to -1', function () {
      const board = [
        [85, 23, 65, 78, 93],
        [27, 53, 10, 12, 26],
        [5, 34, 83, 25, 6],
        [56, 40, 73, 29, 54],
        [33, 68, 41, 32, 82],
      ];

      expect(markDrawnNumber(board, 85)).to.be.eql([
        [-1, 23, 65, 78, 93],
        [27, 53, 10, 12, 26],
        [5, 34, 83, 25, 6],
        [56, 40, 73, 29, 54],
        [33, 68, 41, 32, 82],
      ]);
    });
  });

  describe('isWon', function () {
    it('should return true if row contains only -1', function () {
      const board = [
        [-1, -1, -1, -1, -1],
        [27, 53, 10, 12, 26],
        [5, 34, 83, 25, 6],
        [56, 40, 73, 29, 54],
        [33, 68, 41, 32, 82],
      ];

      expect(isWon(board)).to.be.true;
    });

    it('should return true if column contains only -1', function () {
      const board = [
        [-1, 23, 65, 78, 93],
        [-1, 53, 10, 12, 26],
        [-1, 34, 83, 25, 6],
        [-1, 40, 73, 29, 54],
        [-1, 68, 41, 32, 82],
      ];

      expect(isWon(board)).to.be.true;
    });

    it('should return false if there are no rows or columns containing only -1', function () {
      const board = [
        [85, -1, -1, -1, -1],
        [-1, 53, 10, 12, 26],
        [-1, 34, 83, 25, 6],
        [-1, 40, 73, 29, 54],
        [-1, 68, 41, 32, 82],
      ];

      expect(isWon(board)).to.be.false;
    });
  });

  describe('sumUnmarked', function () {
    it('should return sum of elements that are bigger then mark number(-1)', function () {
      const board = [
        [-1, -1, -1, -1, -1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ];

      expect(sumUnmarked(board)).to.be.eql(20);
    });
  });

  describe('playBingo', function () {
    it('should calculate score from the winning board', function () {
      const parsedInput = parse(input);

      expect(playBingo(parsedInput)).to.be.eql(5685);
    });
  });
});
