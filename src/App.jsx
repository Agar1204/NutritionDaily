import { useState, useEffect } from "react" 

import Signup from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"
import ProtectedRoute from "./Components/ProtectedRoute"
import About from "./Components/About"

import { Navigate, Route, Routes } from "react-router-dom"

import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) 

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading){
    return <div> Authenticating user... </div>
  }

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/home" 
          element = {<ProtectedRoute user={user} children={<Dashboard />} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </>
  )
}
export default App