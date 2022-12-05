import { getByTestId, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

jest.setTimeout(10000)

describe(' App Component', () => {

 

    it('should render loading', async () => {
        const { findByTestId } = render(<App />);
        const linkElement = await findByTestId('home-loading');
        expect(linkElement).toBeInTheDocument();
    });

    it('should render pokemon', async () => {
        const { findByText} = render(<App />);
        
        await waitFor(async () => {
            expect(await findByText('bulbasaur')).toBeInTheDocument();
        }, {
            timeout: 10000
        });
    });

    it('should open modal when user click on pokemon', async () => {
        const { findByText, findByTestId} = render(<App />);
        
        const pokemon = await waitFor(async () => {
            return await findByText('bulbasaur')
        },{timeout: 10000});

        await userEvent.click(pokemon);

        expect(await findByTestId('modal')).toBeInTheDocument();
    });

    it('should close modal when user click on close button', async () => {
        const { findByText, findByTestId,getByTestId} = render(<App />);
        
        const pokemon = await waitFor(async () => {
            return await findByText('bulbasaur')
        },{timeout: 10000});
        await userEvent.click(pokemon);

        const closeButton = await findByTestId('close-button');
        await userEvent.click(closeButton);
        await waitFor(async() => {
            expect(getByTestId('modal')).toHaveClass('d-none');
        }, {timeout: 10000})

    });
  
})