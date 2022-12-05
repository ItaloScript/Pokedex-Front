import { render, waitFor } from '@testing-library/react';

import { CommentCard } from '../components/PokeInfoCard/Comments/CommentCard';


describe('Comments Card Component', () => {
    

    it('should render comment card', async () => {
        const data = {
            key:1,
            comment: 'Oi eu sou goku',
            created_at:{_seconds: 1629200000},
            username: 'goku',
            color :'#49D0B0'
        }
        const { getByText } = render(<CommentCard {...data} />);

        await waitFor(() => {
            expect(getByText('goku')).toBeInTheDocument();
            expect(getByText('Oi eu sou goku')).toBeInTheDocument();
            expect(getByText('17/08/2021 08:33:20')).toBeInTheDocument();
        }, { timeout: 10000 })

    })
    
})