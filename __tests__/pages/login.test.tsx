// import { renderWithProviders } from '@/mocks/renderWithProviders';
import {screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {rest} from 'msw'

import LoginPage from '@/pages/login';
import { renderWithProviders } from '@/mocks/renderWithProviders';
import { server } from '@/mocks/server';

// para centralizar acceso de un btn (más facil de mantener a futuros cambios)
const getLoginBtn = () => screen.getByRole('button',{name: /login/i})

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

  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)

  // en un principio DEBE estar enable
  expect(getLoginBtn()).not.toBeDisabled()

  // se debe tener un form con campos validos
  // y ESPERAR a que sean validos
  await userEvent.type(email,'peter@gmail.com')
  await userEvent.type(password,'1234567')

  //gatillar el evento click login
  userEvent.click(getLoginBtn())

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
  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)
  await userEvent.type(email,'peter@gmail.com')
  await userEvent.type(password,'1234567')
  
  // gatillar evento login
  await userEvent.click(getLoginBtn())
  
  // loading de carga esperado x role progressbar y name loading (aria-label)
  expect(await screen.findByRole('progressbar',{name:/loading/i}))
})

//! - In a unexpected server error, the form page must display the error message
//! “Unexpected error, please try again” from the api.
test.only('should render an error message when API is down', async () => {
  
  // simular caida del server de la API.
  // configurar el server de MSW para que se caiga
  server.use(
    rest.post('/login', (req, res, ctx) => res(
      ctx.delay(), // delay necesario para optimo testing
      ctx.status(500) 
    )),    
  )

  renderWithProviders(<LoginPage/>)

  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)
  await userEvent.type(email, 'peter_parker@gmail.com')
  await userEvent.type(password, '123456789')

  await userEvent.click(getLoginBtn())

  expect(
    await screen.findByText(/Unexpected error, please try again/i)
  ).toBeInTheDocument()
})

