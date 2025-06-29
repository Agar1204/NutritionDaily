import React from "react"

import { Form, Button, Card} from "react-bootstrap"

export default function Signup(){
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    return (
        <>
        <div style={{backgroundColor: '#f8fff8'}} className="min-vh-100 d-flex align-items-center justify-content-center">
            <Card style={{width: '400px', maxWidth: '90%'}}>
                <Card.Header className="d-flex justify-content-center pb-2 bg-white border-0">
                    <img src= "/assets/icon.png"
                        alt="Logo" 
                        width="50" 
                        height="50" 
                        className="me-2"
                    />
                    <h2 className="mb-0 text-center">NutritionDaily</h2>
                </Card.Header>
                <Card.Body className="border-0">
                    <h2 className="text-center"> Login</h2>
                    <Form>
                        <Form.Group id="email" className="mt-2">
                            <Form.Label> Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>

                        <Form.Group id="password" className="mt-2">
                            <Form.Label> Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />
                        </Form.Group>

                        <Button className="mt-3"type="submit"> Login</Button>
                    </Form>
                    <div className="text-center pt-2">
                        <a href="/"> Haven't created an account yet? Sign up </a>
                    </div>
                </Card.Body>
            </Card>
            </div>
        </>
    )
}