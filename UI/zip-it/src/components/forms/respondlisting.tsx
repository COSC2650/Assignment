import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";

export interface RespondListingDetails {
  userID: number;
}

export interface RespondListingProps {
  onOpen(): void;
  onClose(): void;
  onRespondListing(props: RespondListingDetails): void;
  visible: boolean;
  disabled: boolean;
  userID: number;
}

export function RespondListing(props: RespondListingProps) {

  const onRespondListing = () => {
    const respondListingDetails: RespondListingDetails = {
      userID: props.userID,
    };

    props.onRespondListing(respondListingDetails);
  }

  return (
    <Modal isOpen={props.visible} onClose={props.onClose} id="respond">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Respond to Listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Would you like to respond to the owner of this listing?
        </ModalBody>
        <ModalFooter>
          <Flex width="100%">
            <Button id="confirm" onClick={onRespondListing}>
              Respond
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

export default RespondListing;