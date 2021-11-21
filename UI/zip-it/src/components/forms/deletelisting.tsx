import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";

export interface DeleteListingDetails{
    listingID: number;
}

export interface DeleteListingProps {
    onOpen(): void;
    onClose(): void;
    onDeleteListing(props: DeleteListingDetails): void;
    visible: boolean;
    disabled: boolean;
    listingID: number;
}

export function DeleteListing(props: DeleteListingProps) {

    const onDeleteListing = () => {
        const deleteListingDetails: DeleteListingDetails = {
          listingID: props.listingID,
        };
        
props.onDeleteListing(deleteListingDetails);
    }

return (
    <Modal isOpen={props.visible} onClose={props.onClose} id="delete">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this listing?
          WARNING this will be permanent!
          </ModalBody>
        <ModalFooter>
          <Flex width="100%">
            <Button id="confirm" onClick={onDeleteListing}>
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

export default DeleteListing;