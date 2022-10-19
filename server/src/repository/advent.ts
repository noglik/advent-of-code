import { ObjectId } from 'mongodb';
import { db } from '../db';

const ADVENT_COLLECTION = 'advent';

type Solution = {
  day: number;
  input: string;
  result: number;
};

export const insert = async (document: Solution) => {
  try {
    const { insertedId: id } = await db.collection<Solution>(ADVENT_COLLECTION).insertOne(document);
    return id;
  } catch (err) {
    throw Error('Cannot save advent solution');
  }
};

export const findAll = async () => {
  try {
    // filter should be specified for production use, but for excerscise it's fine
    const solutions = await db
      .collection<Solution>(ADVENT_COLLECTION)
      .find()
      .map((doc) => {
        const { _id, ...rest } = doc;
        return { id: _id, ...rest };
      })
      .toArray();

    return solutions;
  } catch (err) {
    throw Error('Cannot retrieve solutions');
  }
};
