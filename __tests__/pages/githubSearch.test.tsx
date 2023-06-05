import GithubSearchPage from "@/pages/githubSearch"
import { render, screen } from "@testing-library/react"

describe('when the github page is mounted',() => {
    
    beforeEach(() => render(<GithubSearchPage/>))

    //!1) There must be a github repositories list page.
    test('should display the title', () => {
        
        expect(screen.getByRole('heading',{name:/Github repositories List/i})).toBeInTheDocument()
    })
    
    //! 2.1)
    test('should be an input text "filter by"', () => {

        expect(screen.getByLabelText(/filter/i,{selector:'input'})).toBeInTheDocument()
    })

    //! 2.2)
    test('should be a search button', () => {
        const searchBtn = screen.getByRole('button',{name:/search/i})

        expect(searchBtn).toBeInTheDocument()

    })

    test('should be an initial message "provide a search option" & click the btn', () => {
      
        const message = screen.getByText(/Please provide a search option and click in the search button/i)
        
        expect(message).toBeInTheDocument()
    })

})