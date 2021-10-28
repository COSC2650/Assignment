import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    Alert,
    AlertIcon,
    AlertDescription,
    FormControl,
  } from '@chakra-ui/react';
  import { Flex, Spacer } from '@chakra-ui/layout';
  import { useState } from 'react';
import internal from 'stream';
import { DiagnosticCategory, Type } from 'typescript';

  export interface newListingDetails {
      postcode: string;
      title: string;
      date: string;
      category: string;
      price: string;
      type: string;
      description: string;
      condition: string;
      availability: string;
      image: string;
  }

  export interface newListingProps{
      onNewListing(props: newListingDetails):void;
      onClose(): void;
      visible:boolean;
  }

  export function NewListing(props: newListingProps) {
    const [formValidationMessage, setFormValidationMessage] = useState('');
    const [formValidationHidden, setFormValidationHidden] = useState(true);
    const [postcode, setPostcode] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [availability, setAvailability] = useState('');
    const [image, setImage] = useState('');

    const postcodeOnChange = (event) => setPostcode(event.target.value);
    const titleOnChange = (event) => setTitle(event.target.value);
    const dateOnChange = (event) => setDate(event.target.value);
    const categoryOnChange = (event) => setCategory(event.target.value)
    const priceOnChange = (event) => setPrice(event.target.value);
    const typeOnChange = (event) => setType(event.target.value);
    const descriptionOnChange = (event) => setDescription(event.target.value);
    const conditionOnChange = (event) => setCondition(event.target.value);
    const availabilityOnChange = (event) => setAvailability(event.target.value);
    const imageOnChange = (event) => setImage(event.target.value);

    const onNewListing = () => {
        const newListingDetails: newListingDetails = {
            postcode: postcode,
            title: title,
            date: date,
            category: category,
            price: price,
            type: type,
            description: description,
            condition: condition,
            availability: availability,
            image: image,
        };

        setFormValidationHidden(false);


        if (title === "") {
            setFormValidationMessage("Your listing title is empty");
        } else if (price === "") {
           setFormValidationMessage("Your listing price is empty");
        } else if (type === "") {
          setFormValidationMessage("Your listing type is empty");
        } else if (description === "") {
         setFormValidationMessage("Your confirmation password is empty");
        } else {
            setFormValidationHidden(true);
            props.onNewListing(newListingDetails);
        }
    };

  return (
    <FormControl>
      <Modal isOpen={props.visible} onClose={props.onClose} id="newListing">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="error" hidden={formValidationHidden} mb={3}>
              <AlertIcon />
              <AlertDescription>{formValidationMessage}</AlertDescription>
            </Alert>
            <Input onChange={titleOnChange} placeholder="Listing Title" variant="filled" mb={3} type="title" id="title"/>
            <Input onChange={priceOnChange} placeholder="Listing Price" variant="filled" mb={3} type="price" id="price"/>
            <Input onChange={typeOnChange} placeholder="Listing Type" variant="filled" mb={3} type="type" id="type"/>
            <Input onChange={descriptionOnChange} placeholder="Listing Description" variant="filled" mb={3} type="description" id="description"/>
            <Input onChange={conditionOnChange} placeholder="Listing Condition" variant="filled" mb={3} type="condition" id="condition"/>
            <Input onChange={availabilityOnChange} placeholder="Listing Availability" variant="filled" mb={3} type="availability" id="availability"/>
            <Input onChange={imageOnChange} placeholder="Image URL" variant="filled" mb={3} type="title" id="title"/>
          </ModalBody>

          <ModalFooter>
            <Flex width="100%">
              <Button onClick={onNewListing}
                id="newListing">
                New Listing
              </Button>
              <Spacer></Spacer>
              <Button onClick={window.close}
              id="cancel">
                  Cancel
                  </Button>
                  </Flex>
                  </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
  }

  export default NewListing;