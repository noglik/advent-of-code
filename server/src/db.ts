import { MongoClient, Db } from 'mongodb';
import { logger } from './logger';

let client = null as unknown as MongoClient;
export let db = null as unknown as Db;

// Ideally migrations should be executed before serving requests,
// either before starting application or during startup
export const setup = async (connectionString: string) => {
  client = new MongoClient(connectionString);

  try {
    await client.connect();
    db = client.db();

    await client.db().command({ ping: 1 });
  } catch (err) {
    await close();
    throw err;
  }
};

export const close = async () => {
  logger.log('Closing DB connection!');
  await client.close();
};
