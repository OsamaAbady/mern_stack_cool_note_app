import { Button } from "react-bootstrap";
interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
}

const NavBarLoggedOutView = ({ onLogInClicked, onSignUpClicked }: NavBarLoggedOutViewProps) => {

    return (
        <>
            <Button onClick={onSignUpClicked}>Sign up</Button>
            <Button onClick={onLogInClicked}>Log in</Button>
        </>
    );
}

export default NavBarLoggedOutView;