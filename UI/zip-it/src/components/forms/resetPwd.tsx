import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useState } from "react";

export interface ResetPwd {
    email: string;
}

export interface ResetProps {
    onOpenLogin(): void;
    onRegister(props: ResetPwd): void;
    onResetPwd(props: ResetPwd): void;
    onClose(): void;
    visible: boolean;
}

//register component
export function Reset(props: ResetProps) {
    const [formValidationMessage, setFormValidationMessage] = useState("");
    const [formValidationHidden, setFormValidationHidden] = useState(true);
    const [email, setEmail] = useState("");

    const emailOnChange = (event) => setEmail(event.target.value);

    const onResetPwd = () => {
        const registrationDetails: ResetPwd = {
            email: email,
        };
        

        // Email regex
        var regexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

        setFormValidationHidden(false);

        if (email === "" || !regexp.test(email)) {
            setFormValidationMessage("Your email is empty or invalid");
            console.log("1")

        } else {
            setFormValidationHidden(true);
            props.onResetPwd(registrationDetails);
            console.log("2")

        }
    };

    return (
        <Modal isOpen={props.visible} onClose={props.onClose} id="reset">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reset your Zip-It password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Alert status="error" hidden={formValidationHidden} mb={3}>
                        <AlertIcon />
                        <AlertDescription>{formValidationMessage}</AlertDescription>
                    </Alert>
                    <Input onChange={emailOnChange} placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
                </ModalBody>
                <ModalFooter>
                    <Flex width="100%">
                        <Button onClick={props.onOpenLogin} id="login">
                            Back
                        </Button>
                        <Spacer></Spacer>
                         <Button onClick={onResetPwd} id="resetPwd">
                            Send email
                        </Button> 
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Reset;