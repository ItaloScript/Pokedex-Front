import { Card, CardText, Col, Row } from "reactstrap";

export function CommentCard({ comment, name, created_at, color }: any) {
    return (
        <Card body className="p-2 px-3 my-2">
            <span style={{
                fontWeight: "600",
                fontSize: "13px",
                color: color
            }}>{name}</span>
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
