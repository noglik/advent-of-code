import { expect } from 'chai';
import { ObjectId } from 'mongodb';
import { db } from '../src/db';
import { day4Input } from './input';

const ADVENT_COLLECTION = 'advent';

describe('Advent router', function () {
  describe('POST /api/advent calculate', async function () {
    it('should solve respective challenge and save in db', async function () {
      const res = await this.server.post('/api/advent').send({ input: day4Input, day: 4 });

      expect(res.status).to.be.eql(200);
      expect(res.body).to.have.property('id');

      const solution = await db
        .collection<{ result: number }>(ADVENT_COLLECTION)
        .findOne({ _id: new ObjectId(res.body.id) });
      expect(res.body.id).to.be.eql(solution?._id.toString());

      expect(res.body.result).to.be.eql(5685);
      expect(res.body.result).to.be.eql(solution?.result);
    });

    // validation middleware can be tested separetely, as unit
    it('should return 400 if input is not a string', async function () {
      const res = await this.server.post('/api/advent').send({ input: 42, day: 4 });

      expect(res.status).to.be.eql(400);
      expect(res.body.message).to.be.eql('Input should have type of string');
    });

    it('should return 400 if day is not 4, 5, 6', async function () {
      const res = await this.server.post('/api/advent').send({ input: day4Input, day: 289 });

      expect(res.status).to.be.eql(400);
      expect(res.body.message).to.be.eql('Day should be number 4, 5 or 6');
    });

    // TODO: mock and throw error to test 500
  });

  describe('GET /api/advent query', function () {
    it('should return save advent submissions', async function () {
      const solution = { day: 4, input: 'funky_input', result: 2 };

      const { insertedId: id } = await db.collection(ADVENT_COLLECTION).insertOne(solution);

      const res = await this.server.get('/api/advent').send();

      expect(res.status).to.be.eql(200);
      const inserted = res.body.find((el: { id: string }) => el.id === id.toString());
      expect(inserted).to.not.be.undefined;
    });
  });
});
