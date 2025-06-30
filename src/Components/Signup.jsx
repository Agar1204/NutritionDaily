import React from "react"

import { Form, Button, Card} from "react-bootstrap"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { useNavigate } from "react-router-dom"


export default function Signup(){
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("")
    const navigate = useNavigate()

    function handleSignup(event){
        event.preventDefault()
        if(password != passwordConfirmation){
            alert("Passwords do not match.");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return sendEmailVerification(user)
        })
        .then(() =>{
            alert("Account created! Please check your inbox to verify your email.")
            navigate("/login")
        })
        .catch((error) => {
            alert(error.message);
        });
    }


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
                    <h2 className="text-center"> Sign Up</h2>
                    <Form onSubmit={handleSignup}>
                        <Form.Group id="name">
                            <Form.Label> Name</Form.Label>
                            <Form.Control placeholder="Enter name" type="name" required onChange={(event) => setName(event.target.value)} />
                        </Form.Group>

                        <Form.Group id="email" className="mt-2">
                            <Form.Label> Email</Form.Label>
                            <Form.Control placeholder="Enter email" type="email" required onChange={(event) => setEmail(event.target.value)} />
                        </Form.Group>

                        <Form.Group id="password" className="mt-2">
                            <Form.Label> Password</Form.Label>
                            <Form.Control placeholder="Enter password" type="password" required onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Group>

                        <Form.Group id="confirm-password" className="mt-2">
                            <Form.Label> Confirm Password</Form.Label>
                            <Form.Control placeholder= "Confirm password" type="password" required onChange={(event) => setPasswordConfirmation(event.target.value)} />
                        </Form.Group>
                        <Button className="mt-3 btn btn-dark"type="submit"> Sign up </Button>
                    </Form>
                    <div className="text-center pt-2">
                        <a href="login"> Already have an account? Sign in </a>
                    </div>
                </Card.Body>
            </Card>
            </div>
        </>
    )
}