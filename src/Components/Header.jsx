import { Navbar, Nav, NavDropdown, Form, Card, Button } from "react-bootstrap"
export default function Header(){
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
                <Nav.Link href="/home" className="me-5"> Dashboard </Nav.Link>
                <Nav.Link href="/history" className="me-5"> History </Nav.Link>
                <Nav.Link href="/goals" className="me-5"> Goals </Nav.Link>
                <Nav.Link href="/meals" className="me-5"> Meals </Nav.Link>
            </Nav>

            <Nav>
                <NavDropdown title="Profile">
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="/login"> Log out </NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Delete Account</NavDropdown.Item>
                </NavDropdown>
            </Nav>
      </Navbar>
      <div> Hello </div>
      </>
    );
}