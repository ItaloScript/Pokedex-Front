import { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
import { typeColor } from '../../constants/typeColor'
import { IPokemon } from '../../interfaces/pokemon.interface'
import PokemonService from '../../services/pokemon.service'
import { Loading } from '../Loading'
import { LoadingImage } from '../LoadingImage'

import { About } from './About'
import { Comments } from './Comments'
import './index.css'


export function PokeInfoCard({ idPokemon, isOpen, onClose }: { idPokemon: number, isOpen: boolean, onClose: () => void }) {

    const [activeTab, setActiveTab] = useState('1')
    const [pokemonData, setPokemonData] = useState<IPokemon | null>()

    useEffect(() => {
        setActiveTab('1')
        setPokemonData(null)
        if (!idPokemon) return
        PokemonService.getPokemonById(idPokemon).then((response: IPokemon) => {
            setPokemonData(response)
        })
    }, [idPokemon])

    return (
        <div data-testid="modal" className={"modal " + (isOpen ? 'd-flex' : 'd-none')}>
            <section className="modal-main">
                {!pokemonData ? <Loading /> :<div className=' position-relative poke-info-card d-flex flex-column ' style={{
                    backgroundColor: typeColor[pokemonData.types[0].type.name],
                }}>
                    <h2 className='position-absolute poke-title' style={{
                        textTransform: 'capitalize',
                        fontSize: '25px',
                    }}>{pokemonData.name}</h2>
                    <img className='pokeball-img' src='https://cdn-icons-png.flaticon.com/512/1068/1068729.png' />
                    {idPokemon && <LoadingImage data-testid="poke-info-image" className="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`} />}
                    <div className='info bg-white'>
                        <Nav >
                            <NavItem className={activeTab === '1' ? 'tab-style' : ''}>
                                <NavLink
                                    style={{
                                        color: "#000000d3",
                                        fontWeight: "700",
                                        fontSize: "15px"
                                    }}
                                    onClick={() => setActiveTab('1')}
                                >
                                    Sobre
                                </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === '2' ? 'tab-style' : ''} >
                                <NavLink
                                    onClick={() => setActiveTab('2')}
                                    style={{
                                        color: "#000000d3",
                                        fontWeight: "700",
                                        fontSize: "15px"
                                    }}
                                >
                                    Comentários
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane onClick={() => setActiveTab('1')} tabId="1">
                                <About data={pokemonData} />
                            </TabPane>
                            <TabPane tabId="2">
                                <Comments color={typeColor[pokemonData.types[0].type.name]} idPokemon={pokemonData.id} />
                            </TabPane>
                        </TabContent>
                    </div>
                </div>}
                <button data-testid="close-button" onClick={onClose} type="button" className='button-close'>
                    {pokemonData ? 'X' : ''}
                </button>
            </section>
        </div>



    )

}