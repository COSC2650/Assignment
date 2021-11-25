import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useState } from "react";

export interface RespondListingDetails {
  senderID: number;
  messageBody: string;
  listingID: number;
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
  const [messageBody, setMessageBody] = useState('')
  const messageBodyOnChange = (event) => setMessageBody(event.target.value)

  const onRespondListing = () => {
    const respondListingDetails: RespondListingDetails = {
      senderID: props.userID,
      messageBody: messageBody,
      listingID: 0
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

          Enter a brief description:
          <Input onChange={messageBodyOnChange} placeholder="Send the seller a question" variant="filled" mb={3} type="message" id="message" />
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