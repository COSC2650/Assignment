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
  userID: string;
  postcode: number;
  title: string;
  date: string;
  category: string;
  price: number;
  type: string;
  description: string;
  condition: string;
  availability: string;
  image: string;
}

export interface newListingProps {
  onNewListing(props: newListingDetails): void;
  onClose(): void;
  visible: boolean;
}

export function NewListing(props: newListingProps) {
  const [formValidationMessage, setFormValidationMessage] = useState('');
  const [formValidationHidden, setFormValidationHidden] = useState(true);
  //const [userID, setUserID] = useState('');
  //const [postcode, setPostcode] = useState(0o0);
  const [title, setTitle] = useState('');
  //const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  //const [condition, setCondition] = useState('');
  const [availability, setAvailability] = useState('');
  const [image, setImage] = useState('');

  const titleOnChange = (event) => setTitle(event.target.value);
  const categoryOnChange = (event) => setCategory(event.target.value);
  const priceOnChange = (event) => setPrice(event.target.value);
  const typeOnChange = (event) => setType(event.target.value);
  const descriptionOnChange = (event) => setDescription(event.target.value);
  const availabilityOnChange = (event) => setAvailability(event.target.value);
  const imageOnChange = (event) => setImage(event.target.value);

  const onNewListing = () => {
    const newListingDetails: newListingDetails = {
      userID: '',
      postcode: 0,
      title: title,
      category: category,
      price: price,
      type: type,
      description: description,
      availability: availability,
      image: image,
      condition: '',
      date: ''
    };

    setFormValidationHidden(false);

    if (title === "") {
      setFormValidationMessage("Your listing title is empty");
    } else if (price === null) {
      setFormValidationMessage("Your listing price is empty");
    } else if (description === "") {
      setFormValidationMessage("Your description is empty");
    } else {
      setFormValidationHidden(true);
      props.onNewListing(newListingDetails);
    }
  };

  function CategorySelection() {
    if (type === 'product') {
      return (
        <>
          <Select
            placeholder="Condition"
            type="condition"
            id="listingCondition"
            onChange={categoryOnChange}
          >
            <option value="goodcondition">Good Condition</option>
            <option value="wellused">Well used</option>
            <option value="barelyused">Barely Used</option>
            <option value="unused">Unused</option>
          </Select>
        </>
      );
    }
    if (type === 'service') {
      return (
        <>
          <Select
            placeholder="Qualification"
            type="qualificaiton"
            id="qualification"
            onChange={categoryOnChange}
          >
            <option value="qualified">Qualified</option>
            <option value="licenced">Qualified and Certified</option>
            <option value="unqualified">Unqualified and Uncertified</option>
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
            onChange={categoryOnChange}
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
            Listing Availability:
            <Select placeholder="Availibility"
              type="availibility"
              id="availibility"
              onChange={availabilityOnChange}>
              <option value="option1">Now</option>
              <option value="option2">Then</option>
              <option value="option3">Booked Out</option>
            </Select>
            Image:
            <Input onChange={imageOnChange} placeholder="Place an image URL here" variant="filled" mb={3} type="title" id="title" />
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