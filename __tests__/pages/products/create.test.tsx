import CreateProductPage from "@/pages/products/create"
import { fireEvent, render, screen } from "@testing-library/react"

//!  tests for user history "Store Form App"
describe('when the form is mounted', () => {
    
    beforeEach(() => render(<CreateProductPage/>))

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

  it('should display validations messages', () => {
    render(<CreateProductPage/>)

    expect(screen.queryByText(/The name is required/i)).not.toBeInTheDocument()
    
    const btnSubmit = screen.getByRole('button',{name:/submit/i})

    fireEvent.click(btnSubmit)

    expect(screen.queryByText(/The name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/The size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/The type is required/i)).toBeInTheDocument()

  })

})