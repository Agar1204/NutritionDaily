import { Navbar, Nav, NavDropdown, Alert} from "react-bootstrap"
import { auth} from "../firebase"
import { signOut } from "firebase/auth"


export default function Header(){
    function handleLogOut(){
        signOut(auth).then(() => {})
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
                    <NavDropdown.Item href="/deleteAccount"> Delete Account</NavDropdown.Item>
                </NavDropdown>
            </Nav>
      </Navbar>
      </>
    );
}