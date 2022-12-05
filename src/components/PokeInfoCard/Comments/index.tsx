import { useEffect, useState } from "react"
import { Button, Card, CardText, Col, Form, Input, Row } from "reactstrap"
import CommentsService from "../../../services/comments.service"
import { CommentCard } from "./CommentCard"
import { RegisterCommentScreen } from "./RegisterCommentScreen"

export function Comments({idPokemon, color}: {idPokemon: number, color:string}) {

    const [needToRegister, setNeedToRegister] = useState(false)
    const [comments, setComments] = useState<Array<any>>([])

    useEffect(() => {
        if(localStorage.getItem('user_data') === null) {
            setNeedToRegister(true)
        }
    },[])

    useEffect(()=>{
        CommentsService.getCommentsByPokemonId(idPokemon).then((response:any)=>{
            setComments(response)
        })
    },[idPokemon])


    async function handleSubmit(e: any) {
        e.preventDefault()
        if (e.target.comment.value.trim() === '') return
        const user_data = JSON.parse((localStorage.getItem('user_data') as string))
        
        const comment = await CommentsService.createComment({
            comment: e.target.comment.value,
            username: user_data.username,
            email: user_data.email,
            pokemonId:  idPokemon
        })
        
        setComments([comment, ...comments])
        e.target.reset()

    }

    if(needToRegister){
        return <RegisterCommentScreen toggleRegisterView={() => setNeedToRegister(false)}/>
    }

    return (
        <div className="pt-3">

            <Form onSubmit={handleSubmit}>
                <Row className="w-100 px-2">
                    <Col xs={10}>
                        <Input className="w-100"
                            style={{
                                fontSize: "14px",
                                minHeight: '60px',
                                maxHeight: '60px'
                            }}
                            id="comment"
                            maxLength={200}
                            placeholder="Insira um comentário sobre o pokemon..."
                            name="text"
                            type="textarea"
                        />
                    </Col>
                    <Col xs={2}>
                        <Button className="my-2" color="primary" outline style={{ fontSize: "14px" }}>
                            Enviar
                        </Button>
                    </Col>
                </Row>
            </Form>

            <div style={{
                minHeight: '266px',
                display: 'flex',
            }}>
                {comments.length === 0 ? (
                    <div
                        className="w-100 mt-2 d-flex justify-content-center align-items-center flex-column "
                    >
                        <img style={{
                            width: '75px',
                            opacity: 0.5,
                            
                        }}
                            src="https://i.pinimg.com/originals/54/c4/57/54c4570f8a9927e272272e996d031f58.png"
                        />
                        <span className="text-muted text-center">
                            Seja o primeiro a comentar <br /> sobre esse pokemon.
                        </span>
                    </div>
                ) :(
                    <div className="px-2" style={{
                        maxHeight: "230px",
                        overflowY: "auto",
                        width: '100%'
                    }}>
                        {[...comments].sort(
                            (a:any, b:any) => new Date(b.created_at._seconds*1000).getTime() - new Date(a.created_at._seconds*1000).getTime() 
                        ).map((comment: any) => {
                            return <CommentCard key={comment.id} {...comment} color={color} />
                        })}
                    </div>
                )}
                
            </div>

        </div>)

}
