import React from "react"

import { Form, Button, Card} from "react-bootstrap"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"


export default function Login(){
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate = useNavigate()

    function handleSignin(event){
        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            if(!user.emailVerified){
                alert("Please verify your email before logging in.")
                auth.signOut()
            } else{
                navigate("/home")
            }
        })
        .catch((error) => {
            alert(error.message)
        })
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
                    <h2 className="text-center"> Login</h2>
                    <Form onSubmit={handleSignin}>
                        <Form.Group id="email" className="mt-2">
                            <Form.Label> Email</Form.Label>
                            <Form.Control placeholder="Enter email" type="email" required onChange={(event) => setEmail(event.target.value)} />
                        </Form.Group>

                        <Form.Group id="password" className="mt-2">
                            <Form.Label> Password</Form.Label>
                            <Form.Control placeholder="Enter password" type="password" required onChange={(event) => setPassword(event.target.value)} />
                        </Form.Group>

                        <div className="d-flex align-items-center">
                            <Button className="mt-3 btn btn-dark" type="submit"> Login</Button>
                            <Button className="mt-3 ms-3 btn btn-dark"type="submit">
                                <img 
                                   src="assets/google.png" 
                                   alt="Google logo" 
                                   width="30"
                                   height="30"
                                   />
                                 Sign in with Google 
                            </Button>
                        </div>
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