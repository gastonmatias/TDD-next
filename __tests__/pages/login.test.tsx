import LoginPage from '@/pages/login';
import {screen, render, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event';

// para centralizar acceso de un btn (más facil de mantener a futuros cambios)
const getLoginBtn = () => screen.getByRole('button',{name: /login/i})

//! there must be a login page ----------------------------------------------
test('should render the login title', () => {
  render(<LoginPage/>)
  expect(screen.getByRole('heading',{name:/login/i})).toBeInTheDocument()
})

//! login page must have a form with: email, password and a submit button-----------.
test('should render the form with fields email, password and submit button', () => {
  render(<LoginPage/>)
  
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(getLoginBtn()).toBeInTheDocument()
  
})

//! - The email and password inputs are required --------------------------------
test('should email and password inputs be required', async () => {
  render(<LoginPage/>)
  
  //? fireEvent permite acceder a fxes o metodos para ejecutar eventos del DOM
  //? user-event engloba varios eventos de fireEvent para ejecutarlos a la vez,
  //? mas cercano a lo qe pasa en la vid
  
  //submit form
  userEvent.click(getLoginBtn())
  
  // expect validation errors
  expect(await screen.findByText(/The email is required/i)).toBeInTheDocument()
  expect(await screen.findByText(/The password is required/i)).toBeInTheDocument()
})