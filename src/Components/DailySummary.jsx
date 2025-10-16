import { Card } from "react-bootstrap"
import ProgressBar from 'react-bootstrap/ProgressBar'
import { userStore } from "../store/userProfileStore"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS} from "chart.js/auto";

export default function DailySummary(props){
    const goals = userStore((state) => state.goals)
    const data = {
        labels: ['Protein', 'Fat', 'Carbs'],
        datasets: [{
            label: "Proportion of Calories",
            data: [props.summary.Protein * 4 / props.summary.Calories, 
                   props.summary.Fat * 9 / props.summary.Calories,
                   props.summary.Carbs * 4 / props.summary.Calories
            ],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']
        }]
    }
    
    return(
            <Card style={{backgroundColor: '#ffffff'}} className="border-0">
                <Card.Header style={{backgroundColor: '#ffffff'}} className="d-flex justify-content-center pb-2 border-0">
                    Summary 
                </Card.Header>
                        
                <Card.Body>
                <div className="d-flex justify-content-between mb-1">
                    <span>Calories</span>
                    <span>{Math.round(props.summary.Calories)}kcal</span>
                </div>
                <ProgressBar now={props.summary.Calories} max={goals.Calories} />

                <div className="d-flex justify-content-between mb-1">
                    <span>Fat</span>
                    <span>{Math.round(props.summary.Fat)}g</span>
                </div>
                <ProgressBar now={props.summary.Fat} max={goals.Fats} />

                <div className="d-flex justify-content-between mb-1">
                    <span>Protein</span>
                    <span>{Math.round(props.summary.Protein)}g</span>
                </div>
                <ProgressBar now={props.summary.Protein} max={goals.Protein} />

                <div className="d-flex justify-content-between mb-1">
                    <span>Carbs</span>
                    <span>{Math.round(props.summary.Carbs)}g</span>
                </div>
                <ProgressBar now={props.summary.Carbs} max={goals.Carbs} />
            </Card.Body>
        </Card>
    )
}