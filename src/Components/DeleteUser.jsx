import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { deleteUser } from "firebase/auth"

export default function DeleteUser(){
    const navigate = useNavigate()

    function deleteAccount(){
        const user = auth.currentUser
        deleteUser(user).then( () => {
            alert("Your account has been successfully deleted. You can always create another one!")
            navigate("/signup")
        }).catch((error) =>{
            alert(error.message)
        })
    }

    return(
        <div style = {{backgroundColor: '#f3fae3'}}className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h3 className="text-center"> Are you sure you would like to delete your account? </h3>
                <div className=" d-flex align-items-center">
                    <Button className="btn btn-dark me-3" onClick={deleteAccount}> Yes </Button>
                    <Button className="btn btn-dark me-3" href="/home"> No </Button>
                </div>
        </div>
    )
}