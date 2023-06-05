import GithubSearchPage from "@/pages/githubSearch"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

beforeEach(() => render(<GithubSearchPage/>))

describe('when the github page is mounted',() => {

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

    //3.1
    test('should be an initial message "provide a search option" & click the btn', () => {
      
        const message = screen.getByText(/Please provide a search option and click in the search button/i)
        
        expect(message).toBeInTheDocument()
    })

    
})

describe('when the user does a search',() => {

    test('the search btn should be disabled until the search is done', async() => {

        const searchBtn = screen.getByRole('button',{name:/search/i})

        expect(searchBtn).not.toBeDisabled()
        
        //click btn
        fireEvent.click(searchBtn)
        
        //expect disabled
        expect(searchBtn).toBeDisabled()

        //expect not disabled (finish)
        await waitFor(() => expect(searchBtn).not.toBeDisabled()) 
    })
})