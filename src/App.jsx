import Signup from "./Components/Signup"
import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"


function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </>
  )
}

export default App
