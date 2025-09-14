import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { Row, Col } from "react-bootstrap"

import { useState, useEffect } from "react"

import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

import Header from "./Header"
import DailyLog from "./DailyLog"
import DailySummary from "./DailySummary"

export default function History(){
    const user = auth.currentUser
    const [currentDate, setCurrentDate] = useState(new Date())
    const [foodList, setFoodList] = useState([])

    const [foodSummary, setFoodSummary] = useState({
        "Calories": 0,
        "Fat": 0,
        "Protein":0,
        "Carbs": 0
    })


    useEffect(() => {
            const safeNumber = (value) => Number(value) || 0 //removing NaN
            const newSummary = foodList.reduce((acc, current) => ({
                "Calories": acc.Calories + safeNumber(current.calories),
                "Fat": acc.Fat + safeNumber(current.fat), 
                "Protein": acc.Protein + safeNumber(current.protein),
                "Carbs": acc.Carbs + safeNumber(current.carbs)
    
            }), {"Calories": 0, "Fat": 0, "Protein": 0, "Carbs": 0})
            setFoodSummary(newSummary)
        }, [foodList])

    // fetch selected date's food list from db
    useEffect(() => {
        console.log(currentDate)
        const foods = async () => {
            try{
                const dateString = currentDate.toISOString().split('T')[0]
                const dailyLogRef = doc(db, "users", user.uid, "dailyLogs", dateString)
                const docSnap = await getDoc(dailyLogRef)
                if (docSnap.exists()){
                    const foodsToday = docSnap.data().foods || []
                    setFoodList(foodsToday)
                } else {
                    setFoodList([])
                }
            } catch(error){
                alert(error.message)
            }
        }
        foods();
    }, [currentDate])
    return(
        <>
            <Header/>
            <div style={{backgroundColor:'#f3fae3'}} className="min-vh-100 text-center">
                <h1> History </h1>
                <DatePicker 
                    selected={currentDate} 
                    onChange={(date) => setCurrentDate(date)} 
                    inline/>
                <Row>
                    <Col md={6}>
                        <DailyLog foodList={foodList} setTodayFoods={setFoodList} updateable={false} />
                    </Col>
                    <Col md={6}>
                        <h1 className="text-center"> <DailySummary summary={foodSummary}/> </h1>
                    </Col>
                </Row>
            </div>
        </>
    )
}