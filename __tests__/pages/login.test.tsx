// import { renderWithProviders } from '@/mocks/renderWithProviders';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {rest} from 'msw'

import LoginPage from '@/pages/login';
import { renderWithProviders } from '@/mocks/renderWithProviders';
import { server } from '@/mocks/server';

// se importa baseURL solo x tema pero de igual manera sera reemplazada
// por el mock configurado en jest.setup.js
import { baseURL } from '@/config'; 

// para centralizar acceso de un btn (más facil de mantener a futuros cambios)
const getLoginBtn = () => screen.getByRole('button',{name: /login/i})

const mockServerWithError = (statusCode: number) => {
  // simular caida del server de la API.
  // configurar el server de MSW para que se caiga
  server.use(
    rest.post(`${baseURL}/login`, (req, res, ctx) => res(
      ctx.delay(), // delay necesario para optimo testing
      ctx.status(statusCode) 
    )),    
  )  
}

const fillAndSendLoginForm = async (email: string, password: string) => {
  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)

  // en un principio btn login DEBE estar enable
  expect(getLoginBtn()).not.toBeDisabled()

  await userEvent.type(emailInput,email)
  await userEvent.type(passwordInput,password)

  //gatillar el evento click login
  await userEvent.click(getLoginBtn())
}

//! there must be a login page ----------------------------------------------
test('should render the login title', () => {

  renderWithProviders(<LoginPage/>)
  expect(screen.getByRole('heading',{name:/login/i})).toBeInTheDocument()
})

//! login page must have a form with: email, password and a submit button-----------.
test('should render the form with fields email, password and submit button', () => {
  renderWithProviders(<LoginPage/>)
    
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(getLoginBtn()).toBeInTheDocument()
  
})

//! - The email and password inputs are required --------------------------------
test('should email and password inputs be required', async () => {
  renderWithProviders(<LoginPage/>)
  
  //? fireEvent permite acceder a fxes o metodos para ejecutar eventos del DOM
  //? user-event engloba varios eventos de fireEvent para ejecutarlos a la vez,
  //? mas cercano a lo qe pasa en la vid
  
  //submit form
  userEvent.click(getLoginBtn())
  
  // expect validation errors
  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(await screen.findByText(/The password is required/i)).toBeInTheDocument()
})

//! - The email value should contain the proper format (“@”, domain value).
test('it should validate the email format (@ & domain value)', async() => {
  renderWithProviders(<LoginPage/>)
  
  //type email
  const email = screen.getByLabelText(/email/i)
  await userEvent.type(email,'asdasdasd')
  
  await userEvent.click(getLoginBtn())
  
  expect(await screen.findByText(/The email is not valid/i)).toBeInTheDocument()
})

//! - The submit button should be disabbled while the form page is fetching the data. 
//! After fetching, the submit button does not have to be disabled.
test('it should disable/enable submit button on fetching/not fetching data', async() => {
  renderWithProviders(<LoginPage/>)

  // se debe tener un form con campos validos y ESPERAR a que sean validos
  await fillAndSendLoginForm('tony_stark@gmail.com','12345678')
  
  // mientras hace fetch se btn login debe estan deshabilitado
  await waitFor(() => expect(getLoginBtn()).toBeDisabled())
})

//! - There should be a loading indicator at the top of the form while it is fetching
test('should render a loading indicator when fetching the form', async () => {

  renderWithProviders(<LoginPage/>)
  
  // asegurarse de qe NO está el indicador de carga ANTES de gatillar btn login
  expect(
    screen.queryByRole('progressbar',{name:/loading/i})
  ).not.toBeInTheDocument()
  
  // form exitoso, paso previo necesario para desplegar spinner
  await fillAndSendLoginForm('peter_parker@hotmail.com','asd454s4')
  
  // loading de carga esperado x role progressbar y name loading (aria-label)
  expect(await screen.findByRole('progressbar',{name:/loading/i}))
})

//! - In a unexpected server error, the form page must display the error message
//! “Unexpected error, please try again” from the api.
test('should render an error message when API is down', async () => {
  
  // simular caida del server de la API (code 500)
  mockServerWithError(500)

  renderWithProviders(<LoginPage/>)
  
  await fillAndSendLoginForm('gwen_stacy@live.com','gwen45678')

  expect(
    await screen.findByText(/Unexpected error, please try again/i)
  ).toBeInTheDocument()
})

//- In the invalid credentials response, the form page must display the error
//  message “The email or password are not correct” from the api.
test('should show an error message when credentials are not correct', async () => {
  renderWithProviders(<LoginPage/>)

  // simular error del cliente en interaccion con api (code 400)
  mockServerWithError(401)

  await fillAndSendLoginForm('bruce_wayne@live.com','batman123')

  expect(
    await screen.findByText(/The email or password are not correct/i)
  ).toBeInTheDocument()

})