import { Alert, Button, Form, Modal } from "react-bootstrap";
import { User } from "../models/user";
import * as UserApi from "../network/user_api";
import { useForm } from "react-hook-form";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/Utils.module.css"
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";



interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (newUser: User) => void,
}


const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserApi.SignUpCredentials>();

    async function onSubmit(signUpInput: UserApi.SignUpCredentials) {
        try {
            const newUser = await UserApi.signUp(signUpInput);
            onSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
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
                    Sign Up
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
                        name="email"
                        label="Email"
                        register={register}
                        type="email"
                        placeholder="Email"
                        error={errors.email}
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
                    >Sign Up</Button>

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;;