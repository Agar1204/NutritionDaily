import Header from "./Header"
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap"
import { Card, Form } from "react-bootstrap"
import FoodItem from "./FoodItem"
import { getDocs } from "firebase/firestore"
import { auth, db } from "../firebase"

import { useState, useEffect } from "react"
import { collection } from "firebase/firestore"

/**
 * @todo Add functionality to remove food from food list (and db), 
 * @todo Allow users to create their own recipes by aggregating ingredients from Nutritionix API
 * @todo Display these saved recipes and allow users to delete them 
 */
export default function Recipes(){
    const user = auth.currentUser
    const [foods, setFoods] = useState([])
    const [fetchFoods, setFetchFoods] = useState(false)

    // fetch saved foods from db
    useEffect(() => {
        const getFoods = async() => {
                try{
                    const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'savedFoods'))
                    const foodsData = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                    }));
                    setFoods(foodsData)
                } catch (error) {
                    alert(error.message)
                }
            }
            getFoods();
        }, [user.uid, fetchFoods])

    console.log(foods)

    return(
        <>
        <Header />
        <div style={{backgroundColor: '#f3fae3'}} className="min-vh-100">
            <Row>
                <Col md={6}>
                    <h1 className="text-center"> Saved Foods</h1>
                    <div>
                        <ListGroup>
                            {foods && foods.map((food) => {
                                return(
                                    <ListGroupItem>
                                        <FoodItem
                                            key = {food.key} 
                                            food = {food}
                                            food_name = {food.food_name}
                                            serving_qty = {food.serving_qty}
                                            unit = {food.serving_units}
                                            cals = {food.calories}
                                            fat = {food.fat}
                                            protein = {food.protein}
                                            carbs = {food.carbs} 
                                            showAddButton = {false}
                                            showSaveButton={false}
                                            saveFood={() => saveFood(food)}
                                            updateable={false} >
                                        </FoodItem>
                                </ListGroupItem>
                                )
                            }
                            )}
                        </ListGroup>
                    </div>
                </Col>

                <Col md={6}>
                    <h1 className="text-center"> Saved Recipes (Coming soon!) </h1>
                </Col>
            </Row>
            <div className="text-center d-flex align-items-center justify-content-center"> 
                <Card style={{width: '400px', maxWidth: '90%'}} className="d-flex align-items-center justify-content-center mt-5">
                    <Card.Header className="d-flex justify-content-center pb-2 bg-white border-0">
                        <h2 className="mb-0 text-center">Create a Recipe</h2>
                    </Card.Header>
                    <Card.Body>
                        Coming soon!
                    </Card.Body>
                    <Form>
                    </Form>
                </Card>
            </div>
        </div>
    </>
    )
}