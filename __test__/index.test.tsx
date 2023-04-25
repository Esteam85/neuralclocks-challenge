import Home from '../pages'
import {render, screen} from "@testing-library/react";

describe('Home component', () => {
    it('should render the "NeuralClocks" title', () => {
        render(<Home/>)
        const home = screen.getByText(/NeuralClocks/i)
        expect(home).toBeInTheDocument()
    })

    it('should render the play button', async () => {
        render(<Home/>)
        const playButton = screen.getByRole('play-button')
        expect(playButton).toBeInTheDocument()
    })

    it('should render the pause button after click play button', async () => {
        render(<Home/>)
        const playButton = screen.getByRole('play-button')
        playButton.click()
        const pauseButton = await screen.findByRole('pause-button')
        expect(pauseButton).toBeInTheDocument()
    })

    it('should render the settings button', async () => {
        render(<Home/>)
        const settingsButton = screen.getByRole('settings-button')
        expect(settingsButton).toBeInTheDocument()
    })
    it('should render the settings after click settings button', async () => {
        render(<Home/>)
        const settingsButton = screen.getByRole('settings-button')
        settingsButton.click()
        const settings = await screen.findByRole('settings')
        expect(settings).toBeInTheDocument()
    })

})