import service from ".";

export default class PokemonService{

    static async getAllPokemons(pageNumber:number = 0, limit = 20){ 
        const data = await service.get(`pokemon/?offset=${pageNumber*limit}&limit=${limit}`)
        return data.data
    }

    static async getPokemonById(id: number){
        const data = await service.get(`pokemon/${id}`)
        return data.data
    }
}