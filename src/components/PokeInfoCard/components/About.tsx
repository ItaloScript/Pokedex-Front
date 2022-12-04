import { Col, Progress, Row } from "reactstrap";
import { statsList } from "../../../constants/statsList";

export function About({data}:any) {
    return (
        <>
            <div className="d-flex pt-4">
                <img className="float-left" style={{
                    width: "100px",
                }}
                    src={data.sprites.front_default}
                />
                <p className="float-left text-muted" style={{
                    fontWeight: "400",
                    fontSize: "14PX",
                    fontStyle: "italic",
                    marginLeft: "1rem",
                }}>
                    {data.species.flavor_text_entries.find((item:any)=>item.language.name === 'en')
                    .flavor_text.replace(//g, ' ').replace('POKéMON','pokemon')
                    .replace(/(\w)(\w*)/g,(_:string,g1:string,g2:string)=>g1.toUpperCase() + g2.toLowerCase())}
                </p>


            </div>

            {data.stats.map((item:any)=>(
                <Row className="d-flex mx-1 mb-3  align-items-center" style={{ fontSize: '14px' }}>
                <Col style={{ fontWeight: '600', color: '#00000068', margin:0, padding:0 }} xs={4}> {statsList[item.stat.name].name}</Col>
                <Col xs={2}> { item.base_stat}</Col>
                <Col xs={6}>
                    <Progress
                        style={{ height: '6px' }}
                        value={item.base_stat}
                        max={255}
                        color={statsList[item.stat.name].color}
                    />
                </Col>
            </Row>
            ))}
        </>

    )
}