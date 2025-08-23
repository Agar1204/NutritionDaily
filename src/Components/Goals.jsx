import { Form, Button, Card, Row, Col, ListGroup} from "react-bootstrap"
import Header from "./Header"
import { useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { userStore } from "../store/userProfileStore"

export default function Goals(){
    const goals = userStore((state) => state.goals)
    const setGoals = userStore((state) => state.setGoals)
    const [calories, setCalories] = useState(0)
    const [fats, setFats] = useState(0)
    const [proteins, setProteins] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const user = auth.currentUser

    useEffect(() => {
        const getGoals = async() => {
            try{
                const goalsRef = doc(db, "users", user.uid)
                const goalsSnap = await getDoc(goalsRef)
                if (goalsSnap.exists()){
                    setGoals(goalsSnap.data().goals)
                    setCalories(goalsSnap.data().goals.Calories)
                    setFats(goalsSnap.data().goals.Fats)
                    setProteins(goalsSnap.data().goals.Protein)
                    setCarbs(goalsSnap.data().goals.Carbs)
                }
            } catch (error) {
                alert(error.message)
            }
        }
        getGoals();}, [goals]
    )

    async function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const newCalories = formData.get("calories")
        const newCarbs = formData.get("carbs")
        const newProteins = formData.get("protein")
        const newFats = formData.get("fats")

        const goalsRef = doc(db, "users", user.uid)
        await updateDoc(goalsRef, {
            'goals.Calories': newCalories,
            'goals.Fats': newFats,
            'goals.Protein': newProteins,
            'goals.Carbs': newCarbs
        });

        setCalories(newCalories)
        setCarbs(newCarbs)
        setFats(newFats)
        setProteins(newProteins)
        
        setGoals({
            Calories: newCalories,
            Fats: newFats,
            Protein: newProteins,
            Carbs: newCarbs
        })
    }

    return(
        <> 
        <Header />
            <div style={{backgroundColor: '#f3fae3'}} className="min-vh-100 pt-5">
                <Row>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <Card style = {{backgroundColor: '#F8F9FA', width:"600px", height:"475px"}}> 
                            <Card.Header style={{backgroundColor: '#F8F9FA'}}className="text-center border-0">
                                <h1> Current Goals</h1>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column">
                                <ListGroup className="flex-grow-1">
                                    <ListGroup.Item style={{backgroundColor: '#F8F9FA', fontSize:"28px"}} className="d-flex justify-content-between py-4">
                                        <span>Calories: {calories}kcal</span>
                                        <small style={{fontSize:"18px"}}>Default: 2000</small>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{backgroundColor: '#F8F9FA', fontSize:"28px"}} className="d-flex justify-content-between py-4">
                                        <span>Fats: {fats}g</span>
                                        <small style={{fontSize:"18px"}}>Default: 60</small>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{backgroundColor: '#F8F9FA', fontSize:"28px"}} className="d-flex justify-content-between py-4">
                                        <span>Protein: {proteins}g</span>
                                        <small style={{fontSize:"18px"}}>Default: 50</small>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{backgroundColor: '#F8F9FA', fontSize:"28px"}} className="d-flex justify-content-between py-4">
                                        <span>Carbs: {carbs}g</span>
                                        <small style={{fontSize:"18px"}}>Default: 200</small>
                                    </ListGroup.Item>
                                </ListGroup>    
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <Card style = {{backgroundColor: '#F8F9FA', width:"600px", height:"475px"}}> 
                            <Card.Header style = {{backgroundColor: '#F8F9FA'}} className="text-center border-0">
                                    <h1> New Goals</h1>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="name">
                                        <Form.Label> Calories</Form.Label>
                                        <Form.Control placeholder="Enter your daily calories goal" name="calories" required />
                                    </Form.Group>
                                
                                    <Form.Group id="email" className="mt-2">
                                        <Form.Label> Fats</Form.Label>
                                        <Form.Control placeholder="Enter your daily g of fats goal" name="fats" required />
                                    </Form.Group>
                                
                                    <Form.Group id="password" className="mt-2">
                                        <Form.Label> Protein</Form.Label>
                                        <Form.Control placeholder="Enter your daily g of protein goal" name="protein" required />
                                    </Form.Group>
                                
                                    <Form.Group id="confirm-password" className="mt-2">
                                        <Form.Label> Carbs</Form.Label>
                                        <Form.Control placeholder= "Enter your daily g of carbs goal" name="carbs" required />
                                    </Form.Group>
                                    <Button className="mt-3 btn btn-dark"type="submit"> Submit </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
             </div>
        </>
    )
}