import { Router, Request } from 'express';
import { findAll, insert } from './repository/advent';
import { calculateResultForDay } from './algorithm';

export const adventRouter = Router();

// calculate and save
adventRouter.post(
  '/',
  // simple validation here, can be replaced for something more sophisticated later on
  (req: Request<never, unknown, { input: string; day: 4 | 5 | 6 }>, res, next) => {
    if (typeof req.body.input !== 'string') {
      return res.status(400).json({ message: 'Input should have type of string' });
    }

    if (![4, 5, 6].includes(req.body.day)) {
      return res.status(400).json({ message: 'Day should be number 4, 5 or 6' });
    }

    next();
  },
  async (
    req: Request<never, { id: string; result: number }, { input: string; day: 4 | 5 | 6 }>,
    res
  ) => {
    const { input, day } = req.body;

    const result = calculateResultForDay(input, day);

    const id = await insert({ day, input, result });

    return res.json({ id: id.toString(), result });
  }
);

// get all submissions
adventRouter.get('/', async (_req, res) => {
  const solutions = await findAll();

  return res.json(solutions);
});
