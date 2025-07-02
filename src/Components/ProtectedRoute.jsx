import { Navigate } from "react-router-dom"

// If a user is logged in, show protected content (children). Else, navigate them back to the login page
export default function ProtectedRoute(props){
    return props.user ? props.children : <Navigate to="/login" replace />
}
