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
  const [listingCategory, setCategory] = useState('')
  const [listingPrice, setPrice] = useState(0)
  const [listingType, setType] = useState('')
  const [listingDescription, setDescription] = useState('')
  const [listingAvailability, setAvailabilty] = useState('')
  const [listingCondition, setCondition] = useState('')

  const titleOnChange = (event) => setTitle(event.target.value)
  const priceOnChange = (event) => setPrice(event.target.value)
  const typeOnChange = (event) => setType(event.target.value)
  const descriptionOnChange = (event) => setDescription(event.target.value)
  const categoryOnChange = (event) => setCategory(event.target.value)
  const availabilityOnChange = (event) => setAvailabilty(event.target.value)
  const conditionOnChange = (event) => setCondition(event.target.value)

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
      listingCondition: listingCondition,
    };

    setFormValidationHidden(false);

    if (listingTitle.length < 3) {
      setFormValidationMessage("Title must be atleast 3 characters");
    } else if (listingPrice < 1) {
      setFormValidationMessage("Your listing price needs to exceed $1.00");
    } else if (listingDescription.length < 3) {
      setFormValidationMessage("Description must be atleast 3 characters");
    } else { 
      setFormValidationHidden(true);
      props.onNewListing(newListingDetails);
      
      // resets props for next listing
      setTitle('');
      setCategory('');
      setPrice(0);
      setType('');
      setDescription('');
      setAvailabilty('');
      setCondition('');
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
              Title:
              <Input onChange={titleOnChange} placeholder="Create a title for your listing here" variant="filled" mb={3} type="title" id="title" />
              Type:
              <Select
                placeholder="Products or Services" id="listingtype" onChange={typeOnChange} mb={3}>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </Select>
              Price:
              $<Input onChange={priceOnChange} placeholder="Create a listing price here" variant="filled" mb={3} type="number" id="price" />
              Description:
              <Input onChange={descriptionOnChange} placeholder="Create a listing description here" variant="filled" mb={3} type="description" id="description" />
              {listingType === "product" && (
                <>
                  Category:
                  <Select 
                    onChange = {categoryOnChange}
                    placeholder="Choose A Category"
                    id="category"
                    mb={3}
                  >
                    <option value="cat1">Category 1</option>
                    <option value="cat2">Category 2</option>
                    <option value="cat3">Category 3</option>
                    <option value="cat4">Category 4</option>
                  </Select>
                  Condition:
                  <Select 
                    onChange = {conditionOnChange}
                    placeholder="Item Condition"
                    id="condition"
                    mb={3}
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Great Condition">Great Condition</option>
                    <option value="Moderate Condition">Moderate Condition</option>
                    <option value="Poor Condition">Poor Condition</option>
                    <option value="Needs Repair">Needs Repair</option>
                  </Select>
                </>
              )}
              {listingType === "service" && (
                <>
                  Qualifications:
                  <Select
                    onChange = {categoryOnChange} 
                    placeholder="Servicer Qualification"
                    id="qualification"
                    mb={3}
                  >
                    <option value="Qualified">Qualified</option>
                    <option value="Qualified and Certified">Qualified and Certified</option>
                    <option value="Unqualified and Uncertified">Unqualified and Uncertified</option>
                  </Select>
                  Service Availability:
                  <Select
                    onChange = {availabilityOnChange} 
                    placeholder="Job Availibility" 
                    id="availibility"
                    mb={3}
                  >
                    <option value="option1">Now</option>
                    <option value="option2">Date</option>
                  </Select>
                </>
              )}
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