import { Card } from "react-bootstrap"
import ProgressBar from 'react-bootstrap/ProgressBar'

export default function DailySummary(props){
    return(
            <Card style={{backgroundColor: '#ffffff'}} className="border-0">
                <Card.Header style={{backgroundColor: '#ffffff'}} className="d-flex justify-content-center pb-2 border-0">
                    Today's Summary 
                </Card.Header>
                        
                <Card.Body>
                <div className="d-flex justify-content-between mb-1">
                    <span>Calories</span>
                    <span>{Math.round(props.summary.Calories)}kcal</span>
                </div>
                <ProgressBar now={props.summary.Calories} max={2000} />

                <div className="d-flex justify-content-between mb-1">
                    <span>Fat</span>
                    <span>{Math.round(props.summary.Fat)}g</span>
                </div>
                <ProgressBar now={props.summary.Fat} max={60} />

                <div className="d-flex justify-content-between mb-1">
                    <span>Protein</span>
                    <span>{Math.round(props.summary.Protein)}g</span>
                </div>
                <ProgressBar now={props.summary.Protein} max={50} />

                <div className="d-flex justify-content-between mb-1">
                    <span>Carbs</span>
                    <span>{Math.round(props.summary.Carbs)}g</span>
                </div>
                <ProgressBar now={props.summary.Carbs} max={200} />
            </Card.Body>
        </Card>
    )
}