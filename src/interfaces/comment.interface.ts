export interface IComment {
    id: number
    username: string
    email: string
    comment: string
    pokemonId: number
    created_at:{
        _seconds: number
    }
}