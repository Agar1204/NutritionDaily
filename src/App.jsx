import { useState, useEffect } from "react" 
import Spinner from "react-bootstrap/Spinner"

import Signup from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"
import ProtectedRoute from "./Components/ProtectedRoute"
import About from "./Components/About"
import DeleteUser from "./Components/DeleteUser"
import Goals from "./Components/Goals"
import History from "./Components/History"
import Recipes from "./Components/Recipes"
import Recommendations from "./Components/Recommendations"

import { Navigate, Route, Routes } from "react-router-dom"

import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) 

  // Set up onAuthStateChanged listener that listens for logins/logouts and handles user state
  useEffect(()=> {
    // onAuthStateChanged listens for changes in auth state and executes callback function when they occur
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    // called when component is unmounted to stop listener
    return unsubscribe
  }, [])

  if (loading){
    return  <Spinner animation="border"/>
  }

  return (
    // ProtectedRoute prevents unauthenticated users from accessing certain pages. Unauthorized users 
    // are only allowed to visit signup and login page. 
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element = {<ProtectedRoute user={user} children={<Dashboard />} />} />
        <Route path="/about" element={ <ProtectedRoute user = {user} children={<About />} /> } />
        <Route path="/deleteAccount" element={ <ProtectedRoute user = {user} children={<DeleteUser />} /> } />
        <Route path="/goals" element={<ProtectedRoute user={user} children={<Goals />} />} />
        <Route path="/history" element={<ProtectedRoute user={user} children={<History />} />} />
        <Route path="/meals" element={<ProtectedRoute user={user} children={<Recipes />} />} />
        <Route path="/recommendations" element={<ProtectedRoute user={user} children={<Recommendations />} />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </>
  )
}
export default App