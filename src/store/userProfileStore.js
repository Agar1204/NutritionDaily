import { create } from "zustand";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const userStore = create((set, get) => ({
    name: null,
    goals: {Calories: 0, protein: 0, carbs: 0, fats: 0 },
    isLoading: true,
    id: null,

    setUserProfile: async (userId) => {
        if(!userId){
            return set({name:null, goals: {Calories: 0, protein: 0, carbs: 0, fats: 0 }, isLoading:false, id:null})
        } 

        set({isLoading: true})
        try {
            const docRef = doc(db, "users", userId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                const data = docSnap.data()
                return set({
                    name: data.name,
                    goals: data.goals,
                    isLoading: false,
                    id: userId
                })
            } else {
                return set({name:null, goals: {Calories: 0, protein: 0, carbs: 0, fats: 0 }, isLoading:false, id: userId})
            }

        } catch(error){
            alert(error.message)
            return set({name:null, goals: {Calories: 0, protein: 0, carbs: 0, fats: 0 }, isLoading:false, id: userId})
        }
    },

    setGoals: async (newGoals) => {
        const id = get().id;
        if(!id){
            alert("Error: User is not logged in.")
        }
        try{
            const goalsRef = doc(db, "users", id)
            await setDoc(goalsRef, {goals: newGoals}, {merge: true});
            set({goals: newGoals})
        } catch (error){
            alert(error.message)
        }
    }
    }
));