import { useState } from "react"
import { Button, Card, CardText, Col, Form, Input, Row } from "reactstrap"

export function Comments() {

    const [comments, setComments] = useState<Array<any>>([])

    async function handleSubmit(e: any) {
        e.preventDefault()
        if(e.target.comment.value.trim() === '') return
        const comment = {
            msg: e.target.comment.value,
            user: 'Usuário',
            created_at: new Date()
        }
        setComments([comment, ...comments])
        e.target.reset()

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
                        <Button className="my-2" color="primary" outline style={{
                            fontSize: "14px",
                        }}>
                            Enviar
                        </Button>
                    </Col>
                </Row>
            </Form>

            <div className="px-2" style={{
                maxHeight: "230px",
                overflowY: "auto",
                backgroundColor: "#ffffff",
            }}>
                {comments.map((comment: any) => {
                    return <Comment {...comment} />
                })}
            </div>

        </div>)

}

function Comment({ msg, user, created_at }: any) {
    return (
        <Card body className="p-2 px-3 my-2">
            <span style={{
                fontWeight: "600",
                fontSize: "13px",
                color: 'rgb(61, 48, 172)'
            }}>{user}</span>
            <Row>
                <Col xs={8} style={{textTransform: 'capitalize'}}>
                    <CardText className="text-muted" style={{ fontSize: "12px", fontStyle: 'italic' }}>{msg}</CardText>
                </Col>
                <Col xs={4} >
                    <CardText className="text-muted" style={{ fontSize: "12px", fontStyle: 'italic' }}>{created_at.toLocaleString()}</CardText>
                </Col>
            </Row>

        </Card>
    )


}
