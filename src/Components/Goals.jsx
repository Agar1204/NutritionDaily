import { Form, Button, Card, Row, Col, ListGroup, Badge} from "react-bootstrap"
import Header from "./Header"

export default function Goals(){
    return(
        <>
        <Header />
            <div style={{backgroundColor: '#f3fae3'}} className="min-vh-100 pt-5">
                <Row>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <Card style = {{width:"400px"}}> 
                            <Card.Header className="text-center">
                                <h1> Current Goals</h1>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item className="d-flex justify-content-between">Calories: 
                                        <small> Default: 2000</small>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between"> Fats: 
                                        <small> Default: 60</small>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between">Protein: 
                                        <small> Default: 50</small>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between"> Carbohydrates: 
                                        <small> Default: 200</small>
                                    </ListGroup.Item>
                                </ListGroup>    
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <h1> Hello </h1>
                    </Col>
                </Row>
             </div>
        </>
    )

}