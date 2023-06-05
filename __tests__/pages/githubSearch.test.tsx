import GithubSearchPage from "@/pages/githubSearch"
import { render, screen } from "@testing-library/react"

describe('when the github page is mounted',() => {
    
    //There must be a github repositories list page.
    test('should display the title', () => {
        render(<GithubSearchPage/>)
        
        expect(screen.getByRole('heading',{name:/Github repositories List/i})).toBeInTheDocument()
    })
    
    test('should be an input text "filter by"', () => {
        render(<GithubSearchPage/>)

        expect(screen.getByLabelText(/filter/i,{selector:'input'})).toBeInTheDocument()
    })

})