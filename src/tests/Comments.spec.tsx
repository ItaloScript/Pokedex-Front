import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import { PokeInfoCard } from '../components/PokeInfoCard';
import { Comments } from '../components/PokeInfoCard/Comments';
import CommentsService from '../services/comments.service';


jest.mock('axios', () => {
    return {
        create: () => {
            return {
                get: () => ({
                    data: [{
                        id: 1,
                        username: 'italo',
                        email: 'italoyoupw@gmail.com',
                        comment: 'comentario_teste',
                        created_at: {
                            _seconds: 1620000000,
                        }
                    }]
                }),
                post: (_:string,data_payload:any) => {
                    return ({
                        data: {
                            id: 2,
                            ...data_payload,
                            created_at: {
                                _seconds: 1620000000,
                            }
                        }
                    })
                },
            }
        }
        
    }
})

describe('Comments Component', () => {

    function registerUser() {
        localStorage.setItem('user_data', JSON.stringify({
            username: 'italo',
            email: 'italoyoupw@gmail.com'
        }))
    }

    beforeEach(() => {
        localStorage.clear();
    })

    it('should render register load if name is not saved', async () => {
        const { findByText } = render(<Comments idPokemon={1} color='#49D0B0' />);
        await waitFor(async() => {
            expect(await findByText('Insira seu nome e e-mail para comentar e ver comentários.')).toBeInTheDocument();
        }, { timeout: 10000 })
    });




    it('should render comments if user has already registered name', async () => {
        registerUser()
        const { findByText } = render(<Comments idPokemon={1} color='#49D0B0' />);
        await waitFor(async () => {
            expect(await findByText('comentario_teste')).toBeInTheDocument();
        }, { timeout: 10000 });
    })

    it('should register user if is not registered', async () => {

        const { getByText, getByPlaceholderText } = render(<Comments idPokemon={1} color='#49D0B0' />);
        const nameInput = getByPlaceholderText('Insira seu nome');
        const emailInput = getByPlaceholderText('Insira seu email');
        const button = getByText('Entrar');
        const mockSubmit = jest.fn();
        userEvent.type(nameInput, 'italo');
        userEvent.type(emailInput, 'italoyoupw@gmail.com')
        const data = {
            username: { value: 'italo' },
            email: { value: 'italoyoupw@gmail.com' },
        }
        mockSubmit.mockResolvedValue(data)
        fireEvent.submit(button, { target: data, preventDefault: mockSubmit });

        expect(localStorage.getItem('user_data')).toEqual(JSON.stringify({
            username: 'italo',
            email: 'italoyoupw@gmail.com'
        }))
    });

    it("should print a new comment if user send a new comment", async () => {
        registerUser()
        const { findByText, getByPlaceholderText, getByText } = render(<Comments idPokemon={1} color='#49D0B0' />);
        const commentInput = getByPlaceholderText('Insira um comentário sobre o pokemon...');
        const button = getByText('Enviar');
        const msg = 'Oi eu sou goku'
        await userEvent.type(commentInput, msg);
        //mocking the data from submit
        const mockSubmit = jest.fn();
        const data = {
            id: {
                value: 1
            },
            username: {
                value: 'italo'
            },
            email: {
                value: 'italoyoupw@gmail.com'
            },
            comment: {
                value: msg
            },
            reset: jest.fn()
        }
        mockSubmit.mockResolvedValue(data)
        fireEvent.submit(button, { target: data, preventDefault: mockSubmit });

        await waitFor(async () => {
            expect(await findByText(msg)).toBeInTheDocument();
        }, { timeout: 10000 });
    })

    it('should work createComment function', async () => {
        const data = {
            comment: 'Oi eu sou goku',
            username: 'italo',
            email: 'italoyoupw@gmail.com',
            pokemonId: 1,
        }
        const result = await CommentsService.createComment(data);
        expect(result).toEqual({
            ...data,
            created_at: {
                _seconds: 1620000000,
            },
            id: 2
        });
    })






})