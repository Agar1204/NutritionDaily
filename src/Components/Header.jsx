import { Navbar, Nav, NavDropdown} from "react-bootstrap"
import { auth} from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"


export default function Header(){
    const navigate = useNavigate()
    function handleLogOut(){
        signOut(auth).then(() => { navigate("/login")})
        .catch((error) => {
            alert(error.message)
        })
    }
    return(
        <>
        <Navbar style={{backgroundColor: "#f3fae3"}} className="pt-0 justify-content-between">
            <Navbar.Brand href="/home">
                <img
                    alt=""
                    src="/assets/icon.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                NutritionDaily
            </Navbar.Brand>

            <Nav>
                <Nav.Link href="/about" className="me-5"> About </Nav.Link>
                <Nav.Link href="/home" className="me-5"> Dashboard </Nav.Link>
                <Nav.Link href="/history" className="me-5"> History </Nav.Link>
                <Nav.Link href="/goals" className="me-5"> Goals </Nav.Link>
                <Nav.Link href="/meals" className="me-5"> Meals </Nav.Link>
            </Nav>

            <Nav>
                <NavDropdown title="Profile" align="end">
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="/login" onClick={handleLogOut}> Log out </NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Delete Account</NavDropdown.Item>
                </NavDropdown>
            </Nav>
      </Navbar>
      </>
    );
}