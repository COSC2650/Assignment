import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";

interface RegisterProps {
    onLogin(): void;
    onRegister(): void;
    onClose(): void;
    visible: boolean;
}

//register component
export function Register(props: RegisterProps) {
    return (
        <Modal isOpen={props.visible} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register to Zip-It!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
                    <Input placeholder="First Name" variant="filled" mb={3} type="name" id="firstName" />
                    <Input placeholder="Last Name" variant="filled" mb={3} type="name" id="lastName" />
                    <Input placeholder="Password" variant="filled" mb={3} type="password" id="password" />
                    <Input placeholder="Confirm Password" variant="filled" type="password" id="password" />
                </ModalBody>

                <ModalFooter>
                    <Flex width="100%">
                        <Button onClick={props.onLogin}>Log In</Button>
                        <Spacer></Spacer>
                        <Button onClick={props.onRegister}>Register</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Register;
