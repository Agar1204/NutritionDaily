import FoodItem from "./FoodItem"
import { ListGroup } from "react-bootstrap"

import { useState } from "react"

import { auth, db } from "../firebase"
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore"


export default function DailyLog({foodList, setTodayFoods}){
    const user = auth.currentUser
    const date = new Date()
    const todaysDate = date.toLocaleDateString('sv-SE')

    async function removeFood(key){
        try{
            const docRef = doc(db, "users", user.uid, "dailyLogs", todaysDate)
            const docSnap = await getDoc(docRef)
    
            if(docSnap.exists()){
                const data = docSnap.data()
                const filteredFoods = data.foods.filter((item) => item.key != key)
                setTodayFoods(filteredFoods)
    
                await updateDoc(docRef, {
                    foods: filteredFoods
                })
            }
        }  catch (error) {
            alert(error.message)
        }
    }
    return(
        <>
            <h1 className="text-center">Daily Log</h1>
            {foodList && 
                <ListGroup className="mt-3">
                    {foodList.map((food) => (
                        <FoodItem key = {food.key}
                                  food_name = {food.food_name}
                                  serving_qty = {food.serving_qty}
                                  unit = {food.serving_units} 
                                  cals = {food.calories}
                                  fat = {food.fat}
                                  protein = {food.protein}
                                  carbs = {food.carbs}
                                  onClick = { () => removeFood(food.key)}
                                  showAddButton={false}/>
                    ))}      
                </ListGroup>
            }
        </>
                                
    )
}