import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as UserApi from './network/user_api';
import NotFoundPage from './pages/NotFoundPage';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await UserApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser()
    }, []);

    return (
        <BrowserRouter>
            <>
                <NavBar
                    loggedInUser={loggedInUser}
                    onLogInClicked={() => setShowLogInModal(true)}
                    onSignUpClicked={() => setShowSignUpModal(true)}
                    onLogOutSuccessful={() => setLoggedInUser(null)}
                />

                <Container >
                    <Routes>
                        <Route path='/' element={<NotesPage loggedInUser={loggedInUser} />} />
                        <Route path='/privacy' element={<PrivacyPage />} />
                        <Route path='/*' element={<NotFoundPage />} />
                    </Routes>
                </Container>

                {
                    showSignUpModal &&
                    <SignUpModal
                        onDismiss={() => setShowSignUpModal(false)}
                        onSignUpSuccessful={(user) => {
                            setLoggedInUser(user);
                            setShowSignUpModal(false);
                        }}
                    />
                }

                {
                    showLogInModal &&
                    <LoginModal
                        onDismiss={() => setShowLogInModal(false)}
                        onLoginSuccessful={(user) => {
                            setLoggedInUser(user);
                            setShowLogInModal(false);
                        }}
                    />
                }

            </>
        </BrowserRouter>

    );
}

export default App;
