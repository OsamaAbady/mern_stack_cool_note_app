import { Button, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as UserApi from "../network/user_api";
import { Link } from "react-router-dom";

interface NavBarLoggedInViewProps {
    user: User,
    onLogOutSuccessful: () => void,
}

const NavBarLoggedInView = ({user, onLogOutSuccessful}:NavBarLoggedInViewProps) => {
    async function logout() {
        try {
            await UserApi.logout();
            onLogOutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
            
        }
    }

    return ( 
        <>
        <Navbar.Text className="me-2">
            Signed in: {user.username}
        </Navbar.Text>
        <Nav.Link as={Link} to="/">
            My Notes
        </Nav.Link>
        <Button onClick={logout}>
            Log out
        </Button>
        </>
     );
}

export default NavBarLoggedInView;