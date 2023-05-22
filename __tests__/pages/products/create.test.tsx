import CreateProductPage from "@/pages/products/create"
import { fireEvent, render, screen } from "@testing-library/react"

// en scope global, se ejecuta para cada test
beforeEach(() => render(<CreateProductPage/>))

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
  it('should display validations messages', () => {
    
    // msjes validacion NO Presentes antes de submitear
    expect(screen.queryByText(/The name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/The size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/The type is required/i)).not.toBeInTheDocument()
    
    // gatillar btn submit
    const btnSubmit = screen.getByRole('button',{name:/submit/i})
    fireEvent.click(btnSubmit)

    // se espera qe esten presentes los msjes de validacion
    expect(screen.queryByText(/The name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/The size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/The type is required/i)).toBeInTheDocument()
    
  })
  
})

//! If the user blurs a field that is empty, then the form must display the
//! required message for that field.
describe('when the user blurs an empty field',() => {
  it('should display the validation message for the input name', () => {
    
    // blur recibe 2 params, 1) elemento al cual hacer blur, 2) object event
    const nameInput = screen.getByLabelText(/name/i)
    fireEvent.blur(nameInput,{ target: {name:'name',value:''}})
    
    // resultado esperado luego del blur
    expect(screen.queryByText(/The name is required/i)).toBeInTheDocument()
    
  })
  
  it('should display the validation message for the input size', () => {
    
    // blur recibe 2 params, 1) elemento al cual hacer blur, 2) object event
    const nameInput = screen.getByLabelText(/size/i)
    fireEvent.blur(nameInput,{ target: {name:'size',value:''}})
    
    // resultado esperado luego del blur
    expect(screen.queryByText(/The size is required/i)).toBeInTheDocument()
    
  })
})