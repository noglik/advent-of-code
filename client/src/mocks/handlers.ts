import { rest } from 'msw';

export const records = [
  {id: '1', input: 'first', day: 4, result: 28},
  {id: '2', input: 'second', day: 5, result: 89},
  {id: '3', input: 'third', day: 6, result: 234},
];

export const handlers = [
  rest.post('/api/advent', async (req, res, ctx) => {
    const body = await req.json()
    if (body.input === 'fail') {
      return res(ctx.status(500), ctx.json({ message: 'Something went wrong' }));
    }

    // local storage can be used to persist interactions between page reloads
    records.push({id: '5', input: body.input, day: body.day, result: 2341});

    return res(ctx.status(200), ctx.json({id: '5'}));
  }),
  rest.get('api/advent', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(records));
  }),
]

