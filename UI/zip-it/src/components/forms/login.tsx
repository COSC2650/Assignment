import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";

interface LoginProps {
    onLogin(): void;
    onRegister(): void;
    onClose(): void;
    visible: boolean;
}

//login component
export function Login(props: LoginProps) {
    return (
        <Modal isOpen={props.visible} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ready? Set? Zip-It!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
                    <Input placeholder="********" variant="filled" type="password" id="password" />
                </ModalBody>

                <ModalFooter>
                    <Flex width="100%">
                        <Button onClick={props.onRegister}>Register</Button>
                        <Spacer></Spacer>
                        <Button onClick={props.onLogin}>Log In</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
// }

export default Login;
