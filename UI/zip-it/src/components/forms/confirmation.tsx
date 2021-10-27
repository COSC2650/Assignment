import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, Alert, AlertIcon, AlertDescription, FormControl } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useState } from "react";

export interface ConfirmationDetails {
    confirmationCode: number;
}

export interface ConfirmationProps {
    disabled: boolean;
    onConfirm(props: ConfirmationDetails): void;
    onClose(): void;
    visible: boolean;
}

//confirmation component
export function Confirmation(props: ConfirmationProps) {
    const [formValidationMessage, setFormValidationMessage] = useState("");
    const [formValidationHidden, setFormValidationHidden] = useState(true);
    const [confirmationCode, setConfirmationCode] = useState(-1);

    const confirmationCodeOnChange = (event) => setConfirmationCode(event.target.value);

    const onConfirm = () => {
        const confirmationDetails: ConfirmationDetails = {
            confirmationCode: confirmationCode,
        };

        setFormValidationHidden(false);

        if (confirmationCode < 0 || confirmationCode >= 100000) {
            setFormValidationMessage("Please enter a valid confirmation code");
        } else {
            setFormValidationHidden(true);
            props.onConfirm(confirmationDetails);
        }
    };

    return (
        <FormControl>
            <Modal isOpen={props.visible} onClose={props.onClose} id="confirmation">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Validate your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Alert status="error" hidden={formValidationHidden} mb={3}>
                            <AlertIcon />
                            <AlertDescription>{formValidationMessage}</AlertDescription>
                        </Alert>
                        <Input disabled={props.disabled} onChange={confirmationCodeOnChange} placeholder="Validation code" variant="filled" type="number" id="confirmationcode" />
                    </ModalBody>

                    <ModalFooter>
                        <Flex width="100%">
                            <Spacer></Spacer>
                            <Button onClick={onConfirm} id="confirm" disabled={props.disabled}>
                                Confirm
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </FormControl>
    );
}

export default Confirmation;
