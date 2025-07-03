import Header from "./Header"
import { Card, Form, Row, Col } from "react-bootstrap"
export default function Dashboard(){
    return(
        <div style={{backgroundColor: '#f3fae3'}} className="min-vh-100">
            <Header />

            <Card style={{backgroundColor: '#f3fae3'}} className="pt-5 d-flex justify-content-center align-items-center border-0 shadow-none">
                <Card.Header className="text-center border-0 shadow-none" style={{backgroundColor: '#f3fae3'}}> 
                    <h1>Welcome to NutritionDaily!</h1> 
                </Card.Header>
            </Card>

            <div className="d-flex justify-content-center px-3">
                <Form style={{maxWidth: "600px", width: "100%"}}>
                    <Form.Group className="mb-3" id="search">
                        <Form.Label className="text-center w-100 fw-semibold">Search for Foods</Form.Label>
                        <Form.Control 
                            type="search" 
                            placeholder="ex: 3 slices of cheese pizza and a can of Diet Coke" 
                        />
                        <Form.Text className="text-muted d-block mt-2">
                            Note: You can search using plain English and be as specific/general as you like. 
                            Including serving sizes and chaining multiple foods is allowed.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>

            <Row>
                <Col md={6}>
                    <h1 className = "text-center"> Daily Log</h1>
                </Col>
                <Col md={6}>
                    <h1 className="text-center"> Today's Summary </h1>
                </Col>
            </Row>

        </div>
    )
}