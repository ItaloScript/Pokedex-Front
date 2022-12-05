import { IInitialPokemonData } from "./InitialPokemonData"

export interface IPokemon extends IInitialPokemonData{
    species:{
      flavor_text_entries: {
        flavor_text: string
        language: {
          name: string
        }
      }
    }
}