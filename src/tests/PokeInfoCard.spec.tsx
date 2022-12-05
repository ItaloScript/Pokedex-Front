import { render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { PokeInfoCard } from '../components/PokeInfoCard';

jest.setTimeout(10000)

describe(' PokeInfoCard Component', () => {

    it('should render poke info', async () => {
        const { findByText} = render(<PokeInfoCard onClose={() => {}} isOpen={true} idPokemon={1} />);
        await waitFor(async () => {
            expect(await findByText('Sobre')).toBeInTheDocument();
        }, { timeout: 10000 });

    });

    it('shoud render poke info with correct image', async () => {
        const { findByTestId } = render(<PokeInfoCard onClose={() => {}} isOpen={true} idPokemon={1} />);
        const image = await waitFor(async () => {
            return await findByTestId('poke-info-image')
        }, {timeout: 10000});
        expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png')
    });

    it('should render poke description', async () => {
        const { findByText} = render(<PokeInfoCard onClose={() => {}} isOpen={true} idPokemon={1} />);
        await waitFor(async () => {
            expect(await findByText(`A Strange Seed Was Planted On Its Back At Birth. The Plant Sprouts And Grows With This Pokemon.`)).toBeInTheDocument();
        }, { timeout: 10000 })
    })

})