import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input, Button, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useState } from "react";

export interface RestrationDetails {
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    userPassword: string;
    userStreet: string;
    userCity: string;
    userState: string;
    userPostCode: number;
}

export interface RegisterProps {
    onOpenLogin(): void;
    onRegister(props: RestrationDetails): void;
    onClose(): void;
    visible: boolean;
    disabled: boolean;
    onresetPwd(): void;
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
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postCode, setPostCode] = useState(0);

    const emailOnChange = (event) => setEmail(event.target.value);
    const firstNameOnChange = (event) => setFirstName(event.target.value);
    const lastNameOnChange = (event) => setLastName(event.target.value);
    const passwordOnChange = (event) => setPassword(event.target.value);
    const passwordConfirmOnChange = (event) => setPasswordConfirm(event.target.value);
    const streetOnChange = (event) => setStreet(event.target.value);
    const cityOnChange = (event) => setCity(event.target.value);
    const stateOnChange = (event) => setState(event.target.value);
    const postCodeOnChange = (event) => setPostCode(event.target.value);

    const onRegister = () => {
        const registrationDetails: RestrationDetails = {
            userEmail: email,
            userFirstName: firstName,
            userLastName: lastName,
            userPassword: password,
            userStreet: street,
            userCity: city,
            userState: state,
            userPostCode: postCode,
        };

        // Email regex
        var regexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

        setFormValidationHidden(false);

        if (!regexp.test(email)) {
            setFormValidationMessage("Your email is empty or invalid");
        } else if (firstName.length < 2 || firstName.length > 50) {
            setFormValidationMessage("Your first name is either empty or an invalid length");
        } else if (lastName.length < 2 || lastName.length > 50) {
            setFormValidationMessage("Your last name is either empty or an invalid length");
        } else if (password.length < 2 || password.length > 50) {
            setFormValidationMessage("Your passwork is either empty or an invalid length");
        } else if (passwordConfirm.length < 2 || passwordConfirm.length > 50) {
            setFormValidationMessage("Your confirmation password is either empty or an invalid length");
        } else if (street.length < 2 || street.length > 50) {
            setFormValidationMessage("Your street is either empty or an invalid length");
        } else if (city.length < 2 || city.length > 50) {
            setFormValidationMessage("Your city is either empty or an invalid length");
        } else if (postCode < 1000 || postCode > 9999) {
            setFormValidationMessage("Your postcode is an invalid input");
        } else if (password !== passwordConfirm) {
            setFormValidationMessage("Your password and confirmation password do not match");
        } else {
            setFormValidationHidden(true);
            props.onRegister(registrationDetails);
        }
    };

    return (
        <Modal isOpen={props.visible} onClose={props.onClose} id="register">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register to Zip-It!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Alert status="error" hidden={formValidationHidden} mb={3}>
                        <AlertIcon />
                        <AlertDescription>{formValidationMessage}</AlertDescription>
                    </Alert>
                    <Input disabled={props.disabled} onChange={emailOnChange} placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
                    <Input disabled={props.disabled} onChange={firstNameOnChange} placeholder="First Name" variant="filled" mb={3} type="name" id="firstName" />
                    <Input disabled={props.disabled} onChange={lastNameOnChange} placeholder="Last Name" variant="filled" mb={3} type="name" id="lastName" />
                    <Input disabled={props.disabled} onChange={passwordOnChange} placeholder="Password" variant="filled" mb={3} type="password" id="password" />
                    <Input disabled={props.disabled} onChange={passwordConfirmOnChange} placeholder="Confirm Password" mb={3} variant="filled" type="password" id="passwordConfirm" />
                    <Input disabled={props.disabled} onChange={streetOnChange} placeholder="Street" mb={3} variant="filled" type="text" id="street" />
                    <Input disabled={props.disabled} onChange={cityOnChange} placeholder="City" mb={3} variant="filled" type="text" id="city" />
                    <Select disabled={props.disabled} onChange={stateOnChange} mb={3} variant="filled" id="state">
                        <option value="ACT">ACT</option>
                        <option value="NSW">NSW</option>
                        <option value="NT">NT</option>
                        <option value="WA">QLD</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="VIC">VIC</option>
                        <option value="WA">WA</option>
                    </Select>
                    <Input disabled={props.disabled} onChange={postCodeOnChange} placeholder="Post Code" variant="filled" type="number" id="postcode" />
                </ModalBody>

                <ModalFooter>
                    <Flex width="100%">
                        <Button disabled={props.disabled} onClick={props.onOpenLogin} id="login">
                            Log In
                        </Button>
                        <Spacer></Spacer>
                        <Button disabled={props.disabled} onClick={onRegister} id="register">
                            Register
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Register;
