export interface IInitialPokemonData{
    id: number
    name: string
    sprites: {
        front_default: string
    }
    types: Array<{
        type: {
            name: string
        }
    }>
    weight: number
    height: number
  }