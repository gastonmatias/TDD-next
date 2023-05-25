import {rest} from 'msw'

import { baseURL } from '@/config'
import { CREATED_STATUS, OK_STATUS } from '@/consts/httpStatus'

export const handlers = [
  // rest.post('/login', (req, res, ctx) => res(
  rest.post(`${baseURL}/login`, (req, res, ctx) => res(
    ctx.delay(), // delay necesario para optimo testing
    ctx.status(OK_STATUS)
    )),
    
  rest.post(`${baseURL}/products/create`, async (req,res,ctx) => {
  // rest.post(`http://apifalsa:8080/products/create`, async (req,res,ctx) => {
    const data = await req.json() //equivalente al req.body
    
    return res(
      ctx.delay(), // delay necesario para optimo testing
      ctx.status(CREATED_STATUS),
      ctx.json(data)
    )
  }),

  rest.get(`${baseURL}/products`, async (req,res,ctx) => {
    return res(
      ctx.delay(), // delay necesario para optimo testing
      ctx.status(OK_STATUS),
      ctx.json({test:'matecito a luka!'})
    )
  }),


]