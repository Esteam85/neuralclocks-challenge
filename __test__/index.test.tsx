import Home from '../pages'
import {render, screen} from "@testing-library/react";

describe('Home component', () => {
    it('should render the "Welcome to Pomodoro" message', () => {
        render(<Home/>)
        const home = screen.getByText(/Welcome to Pomodoro!/i)
        expect(home).toBeInTheDocument()
    })
})