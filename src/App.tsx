import { useEffect, useRef, useState } from 'react'
import { Loading } from './components/Loading'
import { Modal } from './components/Modal'
import { PokeCard } from './components/PokeCard'
import { PokeInfoCard } from './components/PokeInfoCard'
import { useIsElementVisible } from './hooks/useIsElementVisible'
import PokemonService from './services/pokemon'

function App() {
  const lastRef = useRef<any>()
  const [countPage, setCountPage] = useState(0)
  const [pokemons, setPokemons ] = useState<Array<any>>([])
  const [modalState, setModalState] = useState({
    isOpen: false,
    pokemonId: null
  })

  const isLastVisible = useIsElementVisible(lastRef.current);

  function getNewPokemons(){
    PokemonService.getAllPokemons(countPage).then((response:any)=>{
      setPokemons((prev:any)=>([...prev, ...response]))
    })
    setCountPage(countPage+1)
  }

  useEffect(()=>{
    getNewPokemons()
  },[])

  useEffect(()=>{
    if (isLastVisible && pokemons.length > 0) {
      getNewPokemons()
    }
  },[isLastVisible])

  return (
    <>
    <Modal onClose={()=>setModalState({ isOpen: false, pokemonId:null})} isOpen={ modalState.isOpen } children={<PokeInfoCard idPokemon={modalState.pokemonId}/>}/>

    <div className="App d-flex gap-5 mt-5 pt-5   flex-wrap pt-6 flex-items-center justify-content-center">
      {pokemons.map((x)=><PokeCard onClick={()=> setModalState({ isOpen:true, pokemonId: x.id})} pokedata={x} />)}
    </div>
    {<div ref={lastRef} />}
      <div className=' d-flex align-items-center justify-content-center' style={{ width:'99vw'}}>
      <Loading/>
      </div>
    </>
  )
}

export default App
