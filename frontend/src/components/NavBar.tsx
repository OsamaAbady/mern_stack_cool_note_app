import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onLogOutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onLogInClicked, onSignUpClicked, onLogOutSuccessful }: NavBarProps) => {

    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/" >
                    Note App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {
                            loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogOutSuccessful={onLogOutSuccessful}/>
                            : <NavBarLoggedOutView onLogInClicked={onLogInClicked} onSignUpClicked={onSignUpClicked}/>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;