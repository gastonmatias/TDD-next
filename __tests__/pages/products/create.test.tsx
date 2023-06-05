import { baseURL } from "@/config"
import { renderWithProviders } from "@/mocks/renderWithProviders"
import { server } from "@/mocks/server"
import CreateProductPage from "@/pages/products/create"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"


// en scope global, se ejecuta para cada test
beforeEach(() => renderWithProviders(<CreateProductPage/>))

const fillAndSendProductForm = async (name:string, size:string, type:string) => {
  const btnSubmit = screen.getByRole('button',{name:/submit/i})
  const nameInput = screen.getByLabelText(/name/i)
  const sizeInput = screen.getByLabelText(/size/i)
  const typeSelect = screen.getByTestId('type-select')
  const regex = new RegExp(type, "i");
  const optionSelected = screen.queryByText(regex)
  
  await userEvent.type(nameInput,name)
  await userEvent.type(sizeInput,size)
  await userEvent.selectOptions(typeSelect,optionSelected!)
  
  await userEvent.click(btnSubmit)
}

const mockServerWithError = (statusCode:number) => {
  server.use(// .use(): Prepends given request handlers to the current worker instance
    rest.post(`${baseURL}/products/create`,(req,res,ctx) => res(
      ctx.delay(),
      ctx.status(statusCode)
      ))
      )
    }
    
const mockServerNetworkError = () => {
  rest.post(`${baseURL}/products/create`,(req,res,ctx) => (
    res.networkError('Connection error, please try later')
  ))
}

//!  tests for user history "Store Form App"
describe('when the form is mounted', () => {
    //! 1) Acceptance Criteria (AC): There must be a create product form page.----
    it('should render a create product form page', () => {
      expect(
        screen.getByRole('heading',{name: /create product/i})
      ).toBeInTheDocument()
    
    })

    //! 2.1) AC: The form must have the following fields: 
    //! name, size, type (electronic,furniture, clothing)
    it('must have the fields name, size and select type', () => {
        
        const nameInput = screen.getByLabelText(/name/i,{selector:'input'})
        const sizeInput = screen.getByLabelText(/size/i,{selector:'input'})
        const typeSelect = screen.getByTestId('type-select')

        const electronicOption = screen.queryByText(/electronic/i)
        const furnitureOption = screen.queryByText(/furniture/i)
        const clothingOption = screen.queryByText(/clothing/i)

        expect(nameInput).toBeInTheDocument()
        expect(sizeInput).toBeInTheDocument()
        expect(typeSelect).toBeInTheDocument()
        expect(electronicOption).toBeInTheDocument()
        expect(furnitureOption).toBeInTheDocument()
        expect(clothingOption).toBeInTheDocument()
        
        // screen.debug()
    })

  // //! 2.2) AC: The form must have a submit button
  it('must have the button submit', () => {
    
    const btnSubmit = screen.getByRole('button',{name: /submit/i})

    expect(btnSubmit).toBeInTheDocument()

  })
})

describe(('when the user submits the form without values'),() => {

  //! 3) If the user leaves empty fields and clicks the submit button, the form page
  //!   must display required messages as the format: _“The [field name] is
  //!   required”_ aside of the proper field.
  it('should display validations messages', async() => {
    
    // msjes validacion NO Presentes antes de submitear
    expect(screen.queryByText(/The name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/The size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/The type is required/i)).not.toBeInTheDocument()
    
    // gatillar btn submit
    const btnSubmit = screen.getByRole('button',{name:/submit/i})
    await userEvent.click(btnSubmit)

    // se espera qe esten presentes los msjes de validacion
    expect( screen.queryByText(/The name is required/i)).toBeInTheDocument()
    expect( screen.queryByText(/The size is required/i)).toBeInTheDocument()
    expect( screen.queryByText(/The type is required/i)).toBeInTheDocument()
    
    await waitFor(() => expect(btnSubmit).not.toBeDisabled()) 
  })
  
})

//! 4) If the user blurs a field that is empty, then the form must display the
//! required message for that field.
describe('when the user blurs an empty field',() => {
  it('should display the validation message for the input name', async () => {
    
    // blur recibe 2 params, 1) elemento al cual hacer blur, 2) object event
    const nameInput = screen.getByLabelText(/name/i)
    fireEvent.blur(nameInput,{ target: {name:'name',value:''}})
    
    // resultado esperado luego del blur
    expect( await screen.findByText(/The name is required/i)).toBeInTheDocument()
  })
  
  it('should display the validation message for the input size', async() => {
    
    // blur recibe 2 params, 1) elemento al cual hacer blur, 2) object event
    const nameInput = screen.getByLabelText(/name/i)
    const sizeInput = screen.getByLabelText(/size/i)

    await sizeInput.focus();
    await nameInput.focus(); // al cambiar "focus", inmediatamente el elemento anterior hace blur
    
    // resultado esperado luego del blur
    expect( await screen.findByText(/The size is required/i)).toBeInTheDocument()
  })
})

//! The form must send the data to a backend endpoint service.
describe('When the user submits the form',() => {
  
  //! 5) The submit button should be disabbled while the form page is fetching the
  //! data. After fetching, the submit button does not have to be disabled.
  it('should the submit button be disable until the request is done ', async () => {
    
    // en un comienzo se espera qe el btn submit SI este habilitado
    const btnSubmit = screen.getByRole('button',{name:/submit/i})
    expect(btnSubmit).not.toBeDisabled()
    
    const nameInput = screen.getByLabelText(/name/i)
    const sizeInput = screen.getByLabelText(/size/i)
    const typeSelect = screen.getByTestId('type-select')
    const optionSelected = screen.queryByText(/clothing/i)
    // const messageSuccess = await screen.queryByText(/Product Stored successfully/i)
    // const messageSuccess = await screen.findByText(/Product Stored successfully/i);
    // const messageSuccess = screen.findByText(/Product Stored successfully/i);
    

    await userEvent.type(nameInput,'mate')
    await userEvent.type(sizeInput,'grande')
    await userEvent.selectOptions(typeSelect,optionSelected!)

    // gatillar evento click
    await userEvent.click(btnSubmit)
    
    // se espera qe el btn este deshabilitado
    await expect(btnSubmit).toBeDisabled()
      
    await waitFor(() => expect(btnSubmit).not.toBeDisabled()) 
    
  })
  
})

//! The form must send the data to a backend endpoint service.
describe('When the user submits the form CORRECTLY', () => {
  //! 6.1) In the success path, the form page must display the success message
  //! “Product stored”
  it('the form must display a success message', async () => {

    const btnSubmit = screen.getByRole('button',{name:/submit/i})
    await fillAndSendProductForm('mate','grande','clothing')
    
    
    // btn deshabilitado mientras hace fetching
    await expect(btnSubmit).toBeDisabled()
    
    // success message
    await waitFor( async () => 
      expect(
      await  screen.queryByText(/Product Stored successfully/i)
      ).toBeInTheDocument()
    )
      
    // btn nuevamente habilitado
    await expect(btnSubmit).not.toBeDisabled()
  })
  
  //! 6.2)
  it('the form must be cleaned', async () => {
    
    const btnSubmit = screen.getByRole('button',{name:/submit/i})
    const nameInput = screen.getByLabelText(/name/i)
    const sizeInput = screen.getByLabelText(/size/i)
    const typeSelect = screen.getByTestId('type-select')
    
    await fillAndSendProductForm('Jelly2','pequeño','electronic')
    
    // btn deshabilitado mientras fetching
    await expect(btnSubmit).toBeDisabled()
    
    // message success
    await waitFor( () => 
      expect(
        screen.queryByText(/Product Stored successfully/i)
      ).toBeInTheDocument()
    )
    
    // form cleaned!
    await expect(nameInput).toHaveValue('')
    await expect(sizeInput).toHaveValue('')
    await expect(typeSelect).toHaveValue('')
    
    // btn nuevamente habilitado
    await expect(btnSubmit).not.toBeDisabled()
  })
})

//! 7) In a server error, the form page must display the error message 
//! “Unexpected error, please try again
describe("when user submits the form & server returns an unexpected error",() => {
  test('should render error message 500', async () => {
    
    // setear error de server 500
    await mockServerWithError(500)

    // rellenado de form correcto
    await fillAndSendProductForm('termolar','grande','electronic')
    
    // message unexpected error
    await waitFor( () => 
      expect(
        screen.queryByText(/unexpected error/i)
      ).toBeInTheDocument()
    )

  })
})

//! 8) In the invalid request path, the form page must display the error message
//! _“The form is invalid, the fields [field1...fieldN] are required”_.
describe("when user submits the form & server returns an invalid request",() => {
  test('should display error message 400', async () => {
  
    // setear error de server 400
    await mockServerWithError(400)
    
    // rellenado de form CORRECTO (deberia ser incorrecto),
    // PERO se interpondrá el error 400 msw.
    // este paso SOLO es necesario para gatillar el onSubmit, suponiendo que
    // el usuario pudo saltarse las validaciones del form
    await fillAndSendProductForm('termolar','grande','electronic')
    
    
    // message unexpected error
    await waitFor( () => 
      expect(
        screen.queryByText(/The form is invalid, the fields: name, size and type are required!/i)
      ).toBeInTheDocument()
    )
  })
})

//! 9) In the not found service path, the form page must display the message
//! _“Connection error, please try later”_.
describe("when connection fails", () => {
  
  test('should display message connection error', async () => {
    await mockServerNetworkError()

    await waitFor(() => {
      expect(
        screen.queryByText(/Connection error, please try later/i)
      )
    })
  })
})