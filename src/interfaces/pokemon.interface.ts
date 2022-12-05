import { IInitialPokemonData } from "./initial-pokemon-data.interface"

export interface IPokemon extends IInitialPokemonData{
    species:{
      flavor_text_entries: Array<{
        flavor_text: string
        language: {
          name: string
        }
      }>
    },
    stats: Array<{
      base_stat: number
      stat: {
        name: string
      }
    }>
      
}