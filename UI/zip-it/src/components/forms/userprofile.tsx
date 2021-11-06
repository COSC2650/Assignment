import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input, Button, Image} from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useState } from "react";

export interface userProfileDetails {
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
  onUserProfile(props: userProfileDetails): void;
  visible: boolean;
  disabled: boolean;
  userFirstName: string;
  userLastName: string;
  userStreet: string;
  userCity: string;
  userState: string;
  userPostCode: number;
}

export function UserProfile(props: userProfileProps) {
  const logo = '/images/logo_black.png'
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postCode, setPostCode] = useState(0);

    const firstNameOnChange = (event) => setFirstName(event.target.value);
    const lastNameOnChange = (event) => setLastName(event.target.value);
    const streetOnChange = (event) => setStreet(event.target.value);
    const cityOnChange = (event) => setCity(event.target.value);
    const stateOnChange = (event) => setState(event.target.value);
    const postCodeOnChange = (event) => setPostCode(event.target.value);
    
    const onUserProfile = () => {
      const editDetails: userProfileDetails = {
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
      <ModalContent><Image src={logo} width="200px" />
        <ModalHeader>User Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input disabled={props.disabled} onChange={firstNameOnChange}placeholder={props.userFirstName} variant="filled" mb={3} type="name" id="firstName" />
          <Input disabled={props.disabled} onChange={lastNameOnChange} placeholder={props.userLastName} variant="filled" mb={3} type="name" id="lastName" />
          <Input disabled={props.disabled} onChange={streetOnChange}placeholder={props.userStreet} mb={3} variant="filled" type="text" id="street" />
          <Input disabled={props.disabled} onChange={cityOnChange}placeholder={props.userCity} mb={3} variant="filled" type="text" id="city" />
          <Select disabled={props.disabled} onChange={stateOnChange}placeholder={"Your State:" + props.userState}mb={3} variant="filled" id="state">
            <option value="ACT">ACT</option>
            <option value="NSW">NSW</option>
            <option value="NT">NT</option>
            <option value="QLD">QLD</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="VIC">VIC</option>
            <option value="WA">WA</option>
          </Select>
          <Input disabled={props.disabled} onChange={postCodeOnChange} placeholder={"props.userPostCode"} variant="filled" type="number" id="postcode" />
        </ModalBody>

        <ModalFooter>
          <Flex width="100%">
            <Button id="edit" onClick={onUserProfile}>
              Edit
            </Button>
            <Spacer></Spacer>
            <Button id="delete" onClick={props.onClose}>
              Delete
            </Button>
            <Button id="cancel" onClick={props.onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserProfile;