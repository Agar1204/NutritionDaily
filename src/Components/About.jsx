import Header from "./Header"

export default function About(){
    return(
        <>
        <Header />
        <div style={{backgroundColor:'#f3fae3'}} className="min-vh-100 text-center">
            <h1> About Section</h1>


            <h6 className="text-center">Features:</h6>
                <ul className="list-unstyled">
                    <li>Track daily intake of calories, fats, proteins, and carbs</li>
                    <li>Set dietary goals</li>
                    <li>View records of past days</li>
                    <li>Create and save custom recipes with their nutrition content</li>
                    <li>Get personalized meal recommendations based on their past meals, dietary habits, and goal</li>
                </ul>
        </div>
        </>
    )
}