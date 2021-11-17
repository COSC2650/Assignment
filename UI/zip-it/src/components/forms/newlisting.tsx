import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Select,
  Button, Alert, AlertIcon, AlertDescription, FormControl
} from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/layout';
import { useState } from 'react';

export interface newListingDetails {
  listingUserID: number;
  listingPostCode: number;
  listingType: string;
  listingTitle: string;
  listingCategory: string;
  listingCondition: string;
  listingAvailability: string;
  listingPrice: number;
  listingDescription: string;
  listingImageURL: string;
}

export interface newListingProps {
  onNewListing(props: newListingDetails): void;
  onClose(): void;
  visible: boolean;
  disabled: boolean;
  listingUserID: number;
  listingPostCode: number;
}

export function NewListing(props: newListingProps) {
  const [formValidationMessage, setFormValidationMessage] = useState('')
  const [formValidationHidden, setFormValidationHidden] = useState(true)
  const [listingTitle, setTitle] = useState('')
  const [listingCategory] = useState('')
  const [listingPrice, setPrice] = useState(0)
  const [listingType, setType] = useState('')
  const [listingDescription, setDescription] = useState('')
  const [listingAvailability] = useState('')
  const [listingImageURL, setImage] = useState('')
  const [listingCondition] = useState('')

  const titleOnChange = (event) => setTitle(event.target.value)
  const priceOnChange = (event) => setPrice(event.target.value)
  const typeOnChange = (event) => setType(event.target.value)
  const descriptionOnChange = (event) => setDescription(event.target.value)
  const imageOnChange = (event) => setImage(event.target.value)
  const onNewListing = () => {
    const newListingDetails: newListingDetails = {
      listingUserID: props.listingUserID,
      listingPostCode: props.listingPostCode,
      listingTitle: listingTitle,
      listingCategory: listingCategory,
      listingPrice: listingPrice,
      listingType: listingType,
      listingDescription: listingDescription,
      listingAvailability: listingAvailability,
      listingImageURL: listingImageURL,
      listingCondition: listingCondition,
    };

    setFormValidationHidden(false);

    if (listingTitle === "") {
      setFormValidationMessage("Your listing title is empty");
    } else if (listingPrice === null) {
      setFormValidationMessage("Your listing price is empty");
    } else if (listingDescription === "") {
      setFormValidationMessage("Your description is empty");
    } else {
      setFormValidationHidden(true);
      props.onNewListing(newListingDetails);
    }
  };

  function CategorySelection() {
    if (listingType === 'product') {
      return (
        <>
          <Select placeholder="Condition"
            type="condition"
            id="listingCondition"
          >
            <option value="goodcondition">Good Condition</option>
            <option value="wellused">Well Used</option>
            <option value="barelyused">Barely Used</option>
            <option value="unused">Unused</option>
          </Select>
        </>
      );
    }
    if (listingType === 'service') {
      return (
        <>
          <Select placeholder="Qualification"
            type="qualificaiton"
            id="qualification"
          >
            <option value="Qualified">Qualified</option>
            <option value="Qualified and Certified">Qualified and Certified</option>
            <option value="Unqualified and Uncertified">Unqualified and Uncertified</option>
          </Select>
        </>
      );
    } else {
      return (
        <>
          <Select
            placeholder="Category"
            type="category"
            id="category"
            disabled
          ></Select>
        </>
      );
    }
  }

    function CategoryAvailability() {
      if (listingType === 'product') {
        return (
          <>
            <Select placeholder="Availibility" disabled={false}
              type="availibility"
              id="availibility"
            >
              <option value="now">Now</option>
              <option value="dateandtime">Date and Time</option>
              <option value="preorder">Pre Order</option>
            </Select>
          </>
        );
      }
      if (listingType === 'service') {
        return (
          <>
            <Select placeholder="Availibility" disabled={false}
              type="availibility"
              id="availibility"
            >
              <option value="option1">Now</option>
              <option value="option2">Date</option>
            </Select>
          </>
        );
      } else {
        return (
          <>
            <Select
              placeholder="Availibility"
              type="availibility"
              id="availibility"
              disabled
            ></Select>
          </>
        );
      }
    }

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
              Listing Title:
              <Input onChange={titleOnChange} placeholder="Create a title for your listing here" variant="filled" mb={3} type="title" id="title" />
              Listing Price:
              $<Input onChange={priceOnChange} placeholder="Create a listing price here" variant="filled" mb={3} type="price" id="price" />
              Listing Type:
              <Select
                placeholder="Products or Services" type="type" id="type" onChange={typeOnChange}>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </Select>
              Listing Category:
              <CategorySelection />
              Listing Description:
              <Input onChange={descriptionOnChange} placeholder="Create a listing description here" variant="filled" mb={3} type="description" id="description" />
              Listing Condition:
              <CategoryAvailability />
              Image:
              <Input onChange={imageOnChange} placeholder="Place an image URL here" variant="filled" mb={3} type="imageurl" id="imageurl" />
            </ModalBody>

            <ModalFooter>
              <Flex width="100%">
                <Button onClick={onNewListing}
                  id="newListing">
                  New Listing
                </Button>
                <Spacer></Spacer>
                <Button onClick={props.onClose}
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