import Header from "./Header"
import DailyLog from "./DailyLog"
import FoodItem from "./FoodItem"
import { Card, Form, Row, Col, ListGroup, Badge, Button } from "react-bootstrap"

import { auth } from "../firebase"

import { useState, useEffect } from "react"
export default function Dashboard(){
    const user = auth.currentUser
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    
    const [finalSearch, setFinalSearch] = useState("")
    const [finalSearchResult, setFinalSearchResult] = useState([])
    const [foodResult, setFoodResult] = useState([])

    useEffect(() => {
        if(search != ""){
            fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${search}` , {
                method: 'GET',
                headers: {
                    'x-app-id': import.meta.env.VITE_NUTRITIONIX_APP_ID,
                    'x-app-key': import.meta.env.VITE_NUTRITIONIX_API_KEY
                }
            }).then((resp) => resp.json()).then(data => setSearchResults(data["common"])).catch((error) => alert(error.message))
        }
    }, [search])

    useEffect(() => {
        if(finalSearch != ""){
            fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                method: 'POST',
                headers: {
                    'x-app-id': import.meta.env.VITE_NUTRITIONIX_APP_ID,
                    'x-app-key': import.meta.env.VITE_NUTRITIONIX_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: finalSearch
                })
            }).then((resp) => resp.json()).then(data => setFinalSearchResult(data.foods)).catch((error) => alert(error.message))
        }
    }, [finalSearch])

    function handleChange(event){
        setSearch(event.target.value)
    }

    function handleKeyDown(event){
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSubmit()
        }
    }

    function handleSuggestionClick(data){
        setSearch("")
        setFinalSearch(data.food_name)
    }

    function handleSubmit(){
        const searchValue = search
        setSearch("")
        setSearchResults([])

        setFinalSearch(searchValue)
    }

    function addFood(){

    }

    return(
        <div style={{backgroundColor: '#f3fae3'}} className="min-vh-100">
            <Header />

            <Card style={{backgroundColor: '#f3fae3'}} className="pt-5 d-flex justify-content-center align-items-center border-0 shadow-none">
                <Card.Header className="text-center border-0 shadow-none" style={{backgroundColor: '#f3fae3'}}> 
                    <h1>{`Welcome to NutritionDaily, ${user.displayName}!`}</h1> 
                </Card.Header>
            </Card>

            <div className="d-flex justify-content-center px-3">
                <Form onSubmit = {handleSubmit} style={{maxWidth: "600px", width: "100%"}}>
                    <Form.Group className="mb-3" id="search">
                        <Form.Label className="text-center w-100 fw-semibold">Search for Foods</Form.Label>
                        <div className="position-relative">
                            <Form.Control 
                                type="search" 
                                name="search"
                                placeholder="ex: 3 eggs" 
                                value={search}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            {search.length > 0 && (
                                <ListGroup className="position-absolute w-100" style={{ top: '100%'}}>
                                    {searchResults.slice(0, 8).map((data, index) => (
                                        <ListGroup.Item key={index} action onClick={() => handleSuggestionClick(data)}> {data.food_name} </ListGroup.Item>))}
                                </ListGroup>)}

                            {finalSearchResult.length > 0 && (
                                <ListGroup className="mt-3">
                                    {finalSearchResult.map((food) => (
                                        <FoodItem key = {food.ndb_no} food = {food} onClick={addFood}/>
                                    ))}
                                </ListGroup>
                            )}   

                        </div>
                        <Form.Text className="text-muted d-block mt-2">
                            Note: You can search using plain English and be as specific/general as you like. 
                            Including serving sizes and chaining multiple foods is encouraged.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>

            <Row>
                <Col md={6}>
                    <DailyLog />
                </Col>
                <Col md={6}>
                    <h1 className="text-center"> Today's Summary </h1>
                </Col>
            </Row>
        </div>
    )
}