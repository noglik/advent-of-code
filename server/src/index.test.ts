import { expect } from 'chai';
import { add } from './index';

describe('add', function () {
  it('should add two numbers', function () {
    expect(add(2, 2)).to.be.eql(4);
  });
});
