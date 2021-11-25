import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";

export interface DeleteUserDetails {
  userID: number;
}

export interface DeleteUserProps {
  onOpen(): void;
  onClose(): void;
  onDeleteUser(props: DeleteUserDetails): void;
  visible: boolean;
  disabled: boolean;
  userID: number;
}

export function DeleteUser(props: DeleteUserProps) {

  const onDeleteUser = () => {
    const deleteUserDetails: DeleteUserDetails = {
      userID: props.userID,
    };

    props.onDeleteUser(deleteUserDetails);
  }

  return (
    <Modal isOpen={props.visible} onClose={props.onClose} id="delete">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete User Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this profile?
          WARNING this permanently delete this account
        </ModalBody>
        <ModalFooter>
          <Flex width="100%">
            <Button id="confirm" onClick={onDeleteUser}>
              Confirm Delete
            </Button>
            <Spacer></Spacer>
            <Button id="cancel" onClick={props.onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteUser;