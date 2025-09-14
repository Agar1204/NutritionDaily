import { useState, useEffect } from "react" 

import Signup from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"
import ProtectedRoute from "./Components/ProtectedRoute"
import About from "./Components/About"
import DeleteUser from "./Components/DeleteUser"
import Goals from "./Components/Goals"
import History from "./Components/History"

import { Navigate, Route, Routes } from "react-router-dom"

import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { userStore } from "./store/userProfileStore"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) 

  const fetchUserStore = userStore((state) => state.setUserProfile)

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      if(user){
        fetchUserStore(user.uid)
      } else {
        fetchUserStore(null)
      }
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
        <Route path="/about" element={ <ProtectedRoute user = {user} children={<About />} /> } />
        <Route path="/deleteAccount" element={ <ProtectedRoute user = {user} children={<DeleteUser />} /> } />
        <Route path="/goals" element={<ProtectedRoute user={user} children={<Goals />} />} />
        <Route path="/history" element={<ProtectedRoute user={user} children={<History />} />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </>
  )
}
export default App