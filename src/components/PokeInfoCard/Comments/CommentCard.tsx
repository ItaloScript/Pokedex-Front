import { Card, CardText, Col, Row } from "reactstrap";

export function CommentCard({ comment, username, created_at, color }: {
    comment: string,
    username: string,
    created_at: {
        _seconds: number
    },
    color: string
}) {
    return (
        <Card body className="p-2 px-3 my-2">
            <span style={{
                fontWeight: "600",
                fontSize: "13px",
                color: color
            }}>{username}</span>
            <Row>
                <Col xs={8} style={{ textTransform: 'capitalize' }}>
                    <CardText className="text-muted" style={{ fontSize: "12px", fontStyle: 'italic' }}>{comment}</CardText>
                </Col>
                <Col xs={4} >
                    <CardText className="text-muted" style={{ fontSize: "12px", fontStyle: 'italic' }}>{new Date(created_at._seconds*1000).toLocaleString()}</CardText>
                </Col>
            </Row>

        </Card>
    )


}
