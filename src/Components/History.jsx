import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { Row, Col } from "react-bootstrap"

import { useState, useEffect } from "react"

import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

import Header from "./Header"
import DailyLog from "./DailyLog"
import DailySummary from "./DailySummary"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement} from 'chart.js';

ChartJS.register(ArcElement)

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

    let chartData;

    if (foodSummary.Calories == 0){
        chartData = {
            labels: ['No calories eaten yet.'],
            datasets: [{
                label: "Proportion of Calories",
                data: [1],
                backgroundColor: ['#E0E0E0']
            }]
        }

    } else {
        chartData = {
            labels: ['Protein', 'Fat', 'Carbs'],
            datasets: [{
                label: "Proportion of Calories",
                data: [foodSummary.Protein * 4 / foodSummary.Calories, 
                       foodSummary.Fat * 9 / foodSummary.Calories,
                       foodSummary.Carbs * 4 / foodSummary.Calories
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']
            }]
        }
    }

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: "Proportion of Calories per Nutrient"
            }
        }
    }



    const [goals, setGoals] = useState({})

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
                const goalsRef = doc(db, "users", user.uid)
                const goalsSnap = await getDoc(goalsRef)
                if (docSnap.exists()){
                    const foodsToday = docSnap.data().foods || []
                    setFoodList(foodsToday)
                } else {
                    setFoodList([])
                }
                if (goalsSnap.exists()){
                    setGoals(goalsSnap.data().goals)
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
                    inline
                    className="me-5"/>
                <Row>
                    <Col md={6}>
                        <DailyLog foodList={foodList} setTodayFoods={setFoodList} updateable={false} />
                    </Col>
                    <Col md={6}>
                        <h1 className="text-center"> <DailySummary summary={foodSummary} goals = {goals}/> </h1>
                    </Col>
                </Row>
                <div style={{width:"500px"}} className="mx-auto"> <Doughnut data={chartData} options={chartOptions}/></div>
            </div>
        </>
    )
}