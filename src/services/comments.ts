import service from ".";

export default class CommentsService{

    private constructor(){}

    static async createComment(commentData:{
        name: string,
        comment: string,
        pokemonId: number,
        email: string
    }){ 
        const data = await service.post(`comment`,commentData)
        return data.data
    }

    static async getCommentsByPokemonId(pokemonId: number){
        const data = await service.get(`comment/${pokemonId}`)
        return data.data
    }
}