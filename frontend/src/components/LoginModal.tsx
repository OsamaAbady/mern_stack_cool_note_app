import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import * as UserApi from "../network/user_api";
import stylesUtils from '../styles/Utils.module.css';
import TextInputField from "./form/TextInputField";


interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserApi.LoginCredentials>();

    async function onSubmit(loginInput: UserApi.LoginCredentials) {
        try {
            const response = await UserApi.login(loginInput);
            onLoginSuccessful(response);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }


    return (
        <Modal show onHide={onDismiss}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }

                <Form onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        name="username"
                        label="Username"
                        register={register}
                        type="text"
                        placeholder="Username"
                        error={errors.username}
                        registerOptions={{ required: "Required" }}
                    />

                    <TextInputField
                        name="password"
                        label="Password"
                        register={register}
                        type="password"
                        placeholder="Password"
                        error={errors.password}
                        registerOptions={{ required: "Required" }}
                    />

                    <Button className={stylesUtils.width100} 
                        type="submit"
                        disabled={isSubmitting}
                    >Login</Button>
                    
                </Form>

            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;