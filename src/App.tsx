import { useEffect, useRef, useState } from 'react'
import { Loading } from './components/Loading'
import { PokeCard } from './components/PokeCard'
import { PokeInfoCard } from './components/PokeInfoCard'
import { useIsElementVisible } from './hooks/useIsElementVisible'
import { IInitialPokemonData } from './interfaces/initial-pokemon-data.interface'
import PokemonService from './services/pokemon.service'

interface modalState {
  isOpen: boolean
  idPokemon: number | null
}



function App() {
  const lastRef = useRef<any>()
  const [countPage, setCountPage] = useState(0)
  const [pokemons, setPokemons] = useState<Array<IInitialPokemonData>>([])
  const [modalState, setModalState] = useState<modalState>({
    isOpen: false,
    idPokemon: null
  })

  const isLastVisible = useIsElementVisible(lastRef.current);

  function getNewPokemons() {
    PokemonService.getAllPokemons(countPage).then((response: Array<IInitialPokemonData>) => {
      setPokemons((prev) => ([...prev, ...response]))
    })
    setCountPage(countPage + 1)
  }

  useEffect(() => {
    getNewPokemons()
  }, [])

  useEffect(() => {
    if (isLastVisible && pokemons.length > 0) {
      getNewPokemons()
    }
  }, [isLastVisible])

  return (
    <>
    {modalState.idPokemon ? <PokeInfoCard  onClose={() => setModalState({ isOpen: false, idPokemon: null })} isOpen={modalState.isOpen} idPokemon={modalState.idPokemon} /> : <></>}

      <div className="App d-flex gap-5 mt-5 pt-5 mb-5   flex-wrap pt-6 flex-items-center justify-content-center">
        {pokemons.map((x) => <PokeCard key={x.id} onClick={() => setModalState({ isOpen: true, idPokemon: x.id })} pokedata={x} />)}
      </div>
      {<div ref={lastRef} />}
      <div data-testid="home-loading" className='d-flex align-items-center justify-content-center my-5' style={{ width: '99vw' }}>
        <Loading  />
      </div>
    </>
  )
}

export default App
