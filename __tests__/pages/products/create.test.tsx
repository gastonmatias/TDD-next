import CreateProductPage from "@/pages/products/create"
import { render, screen } from "@testing-library/react"

//!  tests for user history "Store Form App"
describe('when the form is mounted', () => {
    
    //! 1) Acceptance Criteria (AC): There must be a create product form page.----
    it('should render a create product form page', () => {
      render(<CreateProductPage/>)  

      expect(screen.queryByText(/create product/i)).toBeInTheDocument()
    })

})