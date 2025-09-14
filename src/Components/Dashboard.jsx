import Header from "./Header"
import DailyLog from "./DailyLog"
import FoodItem from "./FoodItem"
import DailySummary from "./DailySummary"
import { Card, Form, Row, Col, ListGroup} from "react-bootstrap"

import { auth, db } from "../firebase"
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore"

import { useState, useEffect } from "react"
import { userStore } from "../store/userProfileStore"

export default function Dashboard(){
    const user = auth.currentUser

    // Value of input in search bar and results from autocomplete endpoint
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    
    // Value of search bar when submitted and result returned from NLP endpoint
    const [finalSearch, setFinalSearch] = useState("")
    const [finalSearchResult, setFinalSearchResult] = useState([])

    // Foods the user has logged today
    const [todayFoods, setTodayFoods] = useState([])

    const [todaySummary, setTodaySummary] = useState({
        "Calories": 0,
        "Fat": 0,
        "Protein":0,
        "Carbs": 0
    })

    const setCurrentGoals = userStore((state) => state.setGoals)

    // Today's date (format: YYYY-MM-DD)
    const date = new Date()
    const currentDate = date.toLocaleDateString('sv-SE'); 

    // Initialize logged in user's logged food from today
    useEffect(() => {
        const getFoods = async () => {
            try {
                const dailyLogRef = doc(db, "users", user.uid, "dailyLogs", currentDate)
                const goalsRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(dailyLogRef)  
                const goalsSnap = await getDoc(goalsRef)
                if (docSnap.exists()) {
                    const foodsToday = docSnap.data().foods || []
                    setCurrentGoals(goalsSnap.data().goals)
                    setTodayFoods(foodsToday)
                } else {
                    setTodayFoods([])
                }
            } catch (error) {
                alert(error.message)
                setTodayFoods([])
            }
        };
        
        getFoods();
    }, [currentDate, user.uid])

    // Updates user's daily summary whenever their food list is updated
    useEffect(() => {
        const safeNumber = (value) => Number(value) || 0 //removing NaN
        const newSummary = todayFoods.reduce((acc, current) => ({
            "Calories": acc.Calories + safeNumber(current.calories),
            "Fat": acc.Fat + safeNumber(current.fat), 
            "Protein": acc.Protein + safeNumber(current.protein),
            "Carbs": acc.Carbs + safeNumber(current.carbs)

        }), {"Calories": 0, "Fat": 0, "Protein": 0, "Carbs": 0})
        setTodaySummary(newSummary)
    }, [todayFoods])

    // Fetches from Nutritionix API's standard endpoint (for autocomplete search)
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

    // Fetches from Nutritionix API's natural endpoint (for final result after user submits from search bar)
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

    // Sets search value to value in search bar everytime it changes
    function handleChange(event){
        setSearch(event.target.value)
    }

    // Checks if user clicked the enter key when typing in search bar, an alternate way to submit 
    function handleKeyDown(event){
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSubmit()
        }
    }

    // Submission from one of the suggested foods from autocomplete 
    function handleSuggestionClick(data){
        setSearch("")
        setFinalSearch(data.food_name)
    }

    // Submission from clicking enter 
    function handleSubmit(){
        const searchValue = search
        setSearch("")
        setSearchResults([])

        setFinalSearch(searchValue)
    }

    // Adds food to Firestore subcollection in the user's today's log 
    async function addFood(food){
        const date = new Date()
        const currentDate = date.toLocaleDateString('sv-SE'); 

        const dailyLogRef = doc(db, "users", user.uid, "dailyLogs", currentDate)
        const newFood = {
            key: food.ndb_no,
            food_name: food.food_name,
            serving_qty: food.serving_qty,
            serving_units: food.serving_unit,
            calories: food.nf_calories,
            fat: food.nf_total_fat,
            protein: food.nf_protein,
            carbs: food.nf_total_carbohydrate
        }
        try{
            await setDoc(dailyLogRef, {
                foods: arrayUnion(newFood) 
            }, {merge: true}) //adds newFood to list of foods if one exists
            const docSnap = await getDoc(dailyLogRef)
            const foodsToday = docSnap.data().foods
            setTodayFoods(foodsToday)
            setFinalSearchResult([])
        } catch(error){
            alert(error.message)
        }
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

                            {finalSearchResult && (
                                <ListGroup className="mt-3">
                                    {finalSearchResult.map((food) => (
                                        <FoodItem key = {food.ndb_no} 
                                                  food = {food}
                                                  food_name = {food.food_name}
                                                  serving_qty = {food.serving_qty}
                                                  unit = {food.serving_unit}
                                                  cals = {food.nf_calories}
                                                  fat = {food.nf_total_fat}
                                                  protein = {food.nf_protein}
                                                  carbs = {food.nf_total_carbohydrate} 
                                                  showAddButton = {true}
                                                  onClick={() => addFood(food)}
                                                  updateable={true}/>
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
                    <DailyLog foodList = {todayFoods} setTodayFoods={setTodayFoods} updateable={true}/>
                </Col>
                <Col md={6}>
                    <h1 className="text-center"> <DailySummary summary={todaySummary}/> </h1>
                </Col>
            </Row>
        </div>
    )
}