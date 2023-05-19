import CreateProductPage from "@/pages/products/create"
import { fireEvent, getByRole, queryByText, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';

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
    it.only('must have the fields name, size and select type', async() => {
        
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
})
