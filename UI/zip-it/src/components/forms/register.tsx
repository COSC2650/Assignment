import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useState } from "react";

export interface RestrationDetails {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface RegisterProps {
    onOpenLogin(): void;
    onRegister(props: RestrationDetails): void;
    onClose(): void;
    visible: boolean;
}

//register component
export function Register(props: RegisterProps) {
    const [formValidationMessage, setFormValidationMessage] = useState("");
    const [formValidationHidden, setFormValidationHidden] = useState(true);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const emailOnChange = (event) => setEmail(event.target.value);
    const firstNameOnChange = (event) => setFirstName(event.target.value);
    const lastNameOnChange = (event) => setLastName(event.target.value);
    const passwordOnChange = (event) => setPassword(event.target.value);
    const passwordConfirmOnChange = (event) => setPasswordConfirm(event.target.value);

    const onRegister = () => {
        const registrationDetails: RestrationDetails = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
        };

        // Email regex
        var regexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

        setFormValidationHidden(false);

        if (email === "" || !regexp.test(email)) {
            setFormValidationMessage("Your email is empty or invalid");
        } else if (firstName === "") {
            setFormValidationMessage("Your first name is empty");
        } else if (lastName === "") {
            setFormValidationMessage("Your last name is empty");
        } else if (password === "") {
            setFormValidationMessage("Your passwork is empty");
        } else if (passwordConfirm === "") {
            setFormValidationMessage("Your confirmation password is empty");
        } else if (password !== passwordConfirm) {
            setFormValidationMessage("Your password and confirmation passwork do not match");
        } else {
            setFormValidationHidden(true);
            props.onRegister(registrationDetails);
        }
    };

    return (
        <Modal isOpen={props.visible} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register to Zip-It!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Alert status="error" hidden={formValidationHidden} mb={3}>
                        <AlertIcon />
                        <AlertDescription>{formValidationMessage}</AlertDescription>
                    </Alert>
                    <Input onChange={emailOnChange} placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
                    <Input onChange={firstNameOnChange} placeholder="First Name" variant="filled" mb={3} type="name" id="firstName" />
                    <Input onChange={lastNameOnChange} placeholder="Last Name" variant="filled" mb={3} type="name" id="lastName" />
                    <Input onChange={passwordOnChange} placeholder="Password" variant="filled" mb={3} type="password" id="password" />
                    <Input onChange={passwordConfirmOnChange} placeholder="Confirm Password" variant="filled" type="password" id="passwordConfirm" />
                </ModalBody>

                <ModalFooter>
                    <Flex width="100%">
                        <Button onClick={props.onOpenLogin} id="login">
                            Log In
                        </Button>
                        <Spacer></Spacer>
                        <Button onClick={onRegister} id="register">
                            Register
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Register;
