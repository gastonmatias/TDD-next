import {rest} from 'msw'

import { baseURL } from '@/config'
import { BAD_REQUEST_STATUS, CREATED_STATUS, OK_STATUS } from '@/consts/httpStatus'

export const handlers = [
  // rest.post('/login', (req, res, ctx) => res(
  rest.post(`${baseURL}/login`, (req, res, ctx) => res(
    ctx.delay(), // delay necesario para optimo testing
    ctx.status(OK_STATUS)
    )),
    
  rest.post(`${baseURL}/products/create`, async (req,res,ctx) => {
    const {name,size, type} = await req.json() //equivalente al req.body
    
    if (name && size && type) {
      return res(
        ctx.delay(8000), // delay necesario para optimo testing
        ctx.status(CREATED_STATUS),
        ctx.json({name,size, type})// para que resp del MSW retorne tb los datos enviados
      )
    } else{
      return res(
        ctx.delay(), // delay necesario para optimo testing
        ctx.status(BAD_REQUEST_STATUS),
        ctx.json({name,size, type})
      )
    }

  }),

  rest.get(`${baseURL}/products`, async (req,res,ctx) => {
    return res(
      ctx.delay(), // delay necesario para optimo testing
      ctx.status(OK_STATUS),
      ctx.json({test:'matecito a luka!'})
    )
  }),


]