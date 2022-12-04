import { useEffect, useState } from 'react'
import { Nav, Button, Card, CardText, CardTitle, Col, NavItem, NavLink, TabPane, TabContent, Row } from 'reactstrap'
import { typeColor } from '../../constants/typeColor'
import PokemonService from '../../services/pokemon'
import { Loading } from '../Loading'

import LoadingImg from '../LoadingImage'
import { About } from './About'
import { Comments } from './Comments'
import './index.css'

export function PokeInfoCard({ idPokemon }: any) {

    const [activeTab, setActiveTab] = useState('1')
    const [pokemonData, setPokemonData] = useState<any>()

    useEffect(()=>{
        setActiveTab('1')
        setPokemonData(null)
        if(!idPokemon) return
        PokemonService.getPokemonById(idPokemon).then((response:any)=>{
            setPokemonData(response)
        })
    },[idPokemon])

    return (!pokemonData ? <Loading/> : <div className=' position-relative poke-info-card d-flex flex-column ' style={{
        backgroundColor: typeColor[pokemonData.types[0].type.name],
    }}>
        <h2 className='position-absolute poke-title' style={{
            textTransform: 'capitalize',
            fontSize: '25px',
        }}>{pokemonData.name}</h2>
        <img className='pokeball-img' src='https://cdn-icons-png.flaticon.com/512/1068/1068729.png' />
        {idPokemon && <LoadingImg className="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`} />}
        <div className='info bg-white'>
            <Nav >
                <NavItem className={activeTab==='1' ? 'tab-style' : ''}>
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
                <NavItem className={activeTab==='2' ? 'tab-style' : ''} >
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
                    <Comments />
                </TabPane>
            </TabContent>
        </div>
    </div>)

}