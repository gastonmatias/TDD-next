import { baseURL } from '@/config'
import {rest} from 'msw'

export const handlers = [
  // rest.post('/login', (req, res, ctx) => res(
  rest.post(`${baseURL}/login`, (req, res, ctx) => res(
    ctx.delay(), // delay necesario para optimo testing
    ctx.status(200)
    )),
    
    rest.post(`${baseURL}/products/create`, (req,res,ctx) => res(
      // return res(ctx.status(201))
      ctx.delay(), // delay necesario para optimo testing
      ctx.status(200)
    ))

]