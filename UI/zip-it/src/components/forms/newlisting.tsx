import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
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
  const [formValidationMessage, setFormValidationMessage] = useState('');
  const [formValidationHidden, setFormValidationHidden] = useState(true);
  const [listingTitle, setTitle] = useState('');
  const [listingCategory, setCategory] = useState('');
  const [listingPrice, setPrice] = useState(0);
  const [listingType, setType] = useState('');
  const [listingDescription, setDescription] = useState('');
  const [listingAvailability, setAvailabilty] = useState('');
  const [listingCondition, setCondition] = useState('');

  const titleOnChange = (event) => setTitle(event.target.value);
  const priceOnChange = (event) => setPrice(event.target.value);
  const typeOnChange = (event) => setType(event.target.value);
  const descriptionOnChange = (event) => setDescription(event.target.value);
  const categoryOnChange = (event) => setCategory(event.target.value);
  const qualityOnChange = (event) => setCondition(event.target.value);

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
      setFormValidationMessage('Title must be atleast 3 characters');
    } else if (listingPrice < 1) {
      setFormValidationMessage('Your listing price needs to exceed $1.00');
    } else if (listingDescription.length < 3) {
      setFormValidationMessage('Description must be atleast 3 characters');
    } else if (listingType === '') {
      setFormValidationMessage('You must select a listing type');
    } else if (listingType === 'product' && listingCategory === '') {
      setFormValidationMessage('You must select a category');
    } else if (listingType === 'service' && listingCategory === '') {
      setFormValidationMessage('You must select a qualification');
    } else if (listingType === 'product' && listingCondition === '') {
      setFormValidationMessage('You must select a condition');
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
          <ModalHeader>Create New Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="error" hidden={formValidationHidden} mb={3}>
              <AlertIcon />
              <AlertDescription>{formValidationMessage}</AlertDescription>
            </Alert>
            <Input
              onChange={titleOnChange}
              placeholder="Title"
              variant="filled"
              mb={3}
              type="title"
              id="title"
            />
            <Select
              placeholder="Products or Services"
              id="listingtype"
              onChange={typeOnChange}
              mb={3}
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </Select>
            <Input
              onChange={priceOnChange}
              placeholder="Price $"
              variant="filled"
              mb={3}
              type="number"
              id="price"
            />
            <Input
              onChange={descriptionOnChange}
              placeholder="Description"
              variant="filled"
              mb={3}
              type="description"
              id="description"
            />
            {listingType === 'product' && (
              <>
                <Select
                  onChange={categoryOnChange}
                  placeholder="Category"
                  id="category"
                  mb={3}
                >
                  <option value="automotive">Automotive</option>
                  <option value="clothes">Clothes</option>
                  <option value="domestic">Domestic Goods</option>
                  <option value="ectronics">Electronics</option>
                  <option value="gardening">Gardening</option>
                  <option value="handcrafted">HandCrafted</option>
                  <option value="hardware">Hardware</option>
                  <option value="industrial">Industrial</option>
                  <option value="sporting">Sporting Goods</option>
                  <option value="toys">Toys</option>
                </Select>
                <Select
                  onChange={qualityOnChange}
                  placeholder="Condition"
                  id="condition"
                  mb={3}
                >
                  <option value="unused">Unused</option>
                  <option value="likenew">Like New</option>
                  <option value="goodcondition">Good Condition</option>
                  <option value="wellused">Well Used</option>
                  <option value="needsrepair">Needs Repair</option>
                </Select>
              </>
            )}
            {listingType === 'service' && (
              <>
                <Select
                  onChange={categoryOnChange}
                  placeholder="Category"
                  id="category"
                  mb={3}
                >
                  <option value="carpentry">Carpentry</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="fabrication">Fabrication</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="transport">Transport</option>
                </Select>
                <Select
                  onChange={qualityOnChange}
                  placeholder="Qualification"
                  id="qualification"
                  mb={3}
                >
                  <option value="qualandcert">Qualified and Certified</option>
                  <option value="qualified">Qualified</option>
                  <option value="unqualcert">
                    Unqualified and Uncertified
                  </option>
                </Select>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Flex width="100%">
              <Button onClick={onNewListing} id="newListing">
                Create Listing
              </Button>
              <Spacer></Spacer>
              <Button onClick={props.onClose} id="cancel">
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
