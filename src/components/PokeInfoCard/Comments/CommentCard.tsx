import { Card, CardText, Col, Row } from "reactstrap";

export function CommentCard({ msg, user, created_at }: any) {
    return (
        <Card body className="p-2 px-3 my-2">
            <span style={{
                fontWeight: "600",
                fontSize: "13px",
                color: 'rgb(61, 48, 172)'
            }}>{user}</span>
            <Row>
                <Col xs={8} style={{ textTransform: 'capitalize' }}>
                    <CardText className="text-muted" style={{ fontSize: "12px", fontStyle: 'italic' }}>{msg}</CardText>
                </Col>
                <Col xs={4} >
                    <CardText className="text-muted" style={{ fontSize: "12px", fontStyle: 'italic' }}>{created_at.toLocaleString()}</CardText>
                </Col>
            </Row>

        </Card>
    )


}
