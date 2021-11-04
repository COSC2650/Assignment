import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input, Button, Image, Alert, AlertIcon } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";

export interface ModifyUserDetails {
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  userStreet: string;
  userCity: string;
  userState: string;
  userPostCode: number;
}

export interface ModifyUserProps {
  onOpen(): void;
  onClose(): void;
  visible: boolean;
  disabled: boolean;
}

export function ModifyUser(props: ModifyUserProps) {
  const logo = '/images/logo_black.png'

  return (
    <Modal isOpen={props.visible} onClose={props.onClose} id="modify">
      <ModalOverlay />
      <ModalContent><Image src={logo} width="200px" />
        <ModalHeader>Manage Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="error" mb={3}>
            <AlertIcon />
          </Alert>
          <Input disabled={props.disabled} placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
          <Input disabled={props.disabled} placeholder="First Name" variant="filled" mb={3} type="name" id="firstName" />
          <Input disabled={props.disabled} placeholder="Last Name" variant="filled" mb={3} type="name" id="lastName" />
          <Input disabled={props.disabled} placeholder="Password" variant="filled" mb={3} type="password" id="password" />
          <Input disabled={props.disabled} placeholder="Confirm Password" mb={3} variant="filled" type="password" id="passwordConfirm" />
          <Input disabled={props.disabled} placeholder="Street" mb={3} variant="filled" type="text" id="street" />
          <Input disabled={props.disabled} placeholder="City" mb={3} variant="filled" type="text" id="city" />
          <Select disabled={props.disabled} mb={3} variant="filled" id="state">
            <option value="ACT">ACT</option>
            <option value="NSW">NSW</option>
            <option value="NT">NT</option>
            <option value="WA">QLD</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="VIC">VIC</option>
            <option value="WA">WA</option>
          </Select>
          <Input disabled={props.disabled} placeholder="Post Code" variant="filled" type="number" id="postcode" />
        </ModalBody>

        <ModalFooter>
          <Flex width="100%">
            <Button id="edit">
              Edit
            </Button>
            <Spacer></Spacer>
            <Button id="delete">
              Delete
            </Button>
            <Button id="cancel">
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModifyUser;