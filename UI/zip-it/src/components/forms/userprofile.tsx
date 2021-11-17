import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input, Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

export interface userProfileDetails {
    userID: number;
    userFirstName: string;
    userLastName: string;
    userStreet: string;
    userCity: string;
    userState: string;
    userPostCode: number;
}

export interface userProfileProps {
    onOpen(): void;
    onClose(): void;
    onDeleteUser(): void;
    onUserProfile(props: userProfileDetails): void;
    visible: boolean;
    disabled: boolean;
    userID: number;
    userFirstName: string;
    userLastName: string;
    userStreet: string;
    userCity: string;
    userState: string;
    userPostCode: number;
}

export function UserProfile(props: userProfileProps) {
    const [firstName, setFirstName] = useState(props.userFirstName);
    const [lastName, setLastName] = useState(props.userLastName);
    const [street, setStreet] = useState(props.userStreet);
    const [city, setCity] = useState(props.userCity);
    const [state, setState] = useState(props.userState);
    const [postCode, setPostCode] = useState(props.userPostCode);

    const firstNameOnChange = (event) => setFirstName(event.target.value);
    const lastNameOnChange = (event) => setLastName(event.target.value);
    const streetOnChange = (event) => setStreet(event.target.value);
    const cityOnChange = (event) => setCity(event.target.value);
    const stateOnChange = (event) => setState(event.target.value);
    const postCodeOnChange = (event) => setPostCode(event.target.value);

    useEffect(() => {
        setFirstName(props.userFirstName);
    }, [props.userFirstName]);

    useEffect(() => {
        setLastName(props.userLastName);
    }, [props.userLastName]);

    useEffect(() => {
        setStreet(props.userStreet);
    }, [props.userStreet]);

    useEffect(() => {
        setCity(props.userCity);
    }, [props.userCity]);

    useEffect(() => {
        setState(props.userState);
    }, [props.userState]);

    useEffect(() => {
        setPostCode(props.userPostCode);
    }, [props.userPostCode]);

    const onUserProfile = () => {
        const editDetails: userProfileDetails = {
            userID: props.userID,
            userFirstName: firstName,
            userLastName: lastName,
            userStreet: street,
            userCity: city,
            userState: state,
            userPostCode: postCode,
        };

        props.onUserProfile(editDetails);
    };

    return (
        <Modal isOpen={props.visible} onClose={props.onClose} id="modify">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input disabled={props.disabled} onChange={firstNameOnChange} value={firstName} variant="filled" mb={3} type="name" id="firstName" />
                    <Input disabled={props.disabled} onChange={lastNameOnChange} value={lastName} variant="filled" mb={3} type="name" id="lastName" />
                    <Input disabled={props.disabled} onChange={streetOnChange} value={street} mb={3} variant="filled" type="text" id="street" />
                    <Input disabled={props.disabled} onChange={cityOnChange} value={city} mb={3} variant="filled" type="text" id="city" />
                    <Select disabled={props.disabled} onChange={stateOnChange} value={state} mb={3} variant="filled" id="state">
                        <option value="ACT">ACT</option>
                        <option value="NSW">NSW</option>
                        <option value="NT">NT</option>
                        <option value="QLD">QLD</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="VIC">VIC</option>
                        <option value="WA">WA</option>
                    </Select>
                    <Input disabled={props.disabled} onChange={postCodeOnChange} value={postCode} variant="filled" type="number" id="postcode" />
                </ModalBody>

                <ModalFooter>
                    <Flex width="100%">
                        <Button id="delete" onClick={props.onDeleteUser} mr={2}>
                            Delete
                        </Button>
                        <Button id="cancel" onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Spacer></Spacer>
                        <Button id="save" onClick={onUserProfile}>
                            Save
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default UserProfile;
