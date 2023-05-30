import {rest} from 'msw'

import { baseURL } from '@/config'
import { BAD_REQUEST_STATUS, CREATED_STATUS, OK_STATUS } from '@/consts/httpStatus'
import { INTERNAL_ERROR_STATUS } from '@/consts/httpStatus'

export const handlers = [
  // rest.post('/login', (req, res, ctx) => res(
  rest.post(`${baseURL}/login`, (req, res, ctx) => res(
    ctx.delay(), // delay necesario para optimo testing
    ctx.status(OK_STATUS)
    )),
    
  rest.post(`${baseURL}/products/create`, async (req,res,ctx) => {
    const {name,size, type} = await req.json() //equivalente al req.body
    
    // return res.networkError('Failed to connect') // para testear error conexion

    if (name && size && type) {
      return res(
        ctx.delay(), // random realistic server response time
        ctx.status(CREATED_STATUS),
        // ctx.status(INTERNAL_ERROR_STATUS), // para test error 500
        // ctx.status(BAD_REQUEST_STATUS), // para test error 400
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