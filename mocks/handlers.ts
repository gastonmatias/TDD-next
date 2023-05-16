import {rest} from 'msw'

export const handlers = [
  rest.post('/login', (req, res, ctx) => res(
    ctx.delay(), // delay necesario para optimo testing
    ctx.status(200)
  )),
]