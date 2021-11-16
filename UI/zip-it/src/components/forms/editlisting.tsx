import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input, Button, Image } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useState } from "react";

export interface editListingDetails {
    listingID: number;
    listingTitle: string;
    listingPostCode: number;
    listingCategory: string;
    listingPrice: number;
    listingType: string;
    listingDescription: string;
    listingCondition: string;
    listingImageURL: string;
}

export interface editListingProps {
    onOpen(): void;
    onClose(): void;
    onEditListing(props: editListingDetails): void;
    visible: boolean;
    disabled: boolean;
    listingID: number;
    listingTitle: string;
    listingPostCode: number;
    listingCategory: string;
    listingPrice: number;
    listingType: string;
    listingDescription: string;
    listingCondition: string;
    listingImageURL: string;
}

export function EditListing(props: editListingProps) {
    const logo = '/images/logo_black.png'
    const [listingTitle, setListingTitle] = useState("");
    const [listingPostCode, setListingPostCode] = useState(0);
    const [listingCategory, setListingCategory] = useState("");
    const [listingPrice, setListingPrice] = useState(0);
    const [listingType, setListingType] = useState("");
    const [listingDescription, setListingDescription] = useState("");
    const [listingCondition, setListingCondition] = useState("");
    const [listingImageURL, setListingImageURL] = useState("");

    const listingTitleOnChange = (event) => setListingTitle(event.target.value);
    const listingPostCodeOnChange = (event) => setListingPostCode(event.target.value);
    const listingCategoryOnChange = (event) => setListingCategory(event.target.value);
    const listingPriceOnChange = (event) => setListingPrice(event.target.value);
    const listingTypeOnChange = (event) => setListingType(event.target.value);
    const listingDescriptionOnChange = (event) => setListingDescription(event.target.value);
    const listingConditionOnChange = (event) => setListingCondition(event.target.value);
    const listingImageURLOnChange = (event) => setListingImageURL(event.target.value);



    const onEditListing = () => {
        const editListing: editListingDetails = {
            listingID: props.listingID,
            listingTitle: listingTitle,
            listingPostCode: listingPostCode,
            listingCategory: listingCategory,
            listingPrice: listingPrice,
            listingType: listingType,
            listingDescription: listingDescription,
            listingCondition: listingCondition,
            listingImageURL: listingImageURL,
        };

        props.onEditListing(editListing);
    };

    return (
        <Modal isOpen={props.visible} onClose={props.onClose} id="editlisting">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Listing</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input disabled={props.disabled} onChange={listingTitleOnChange} placeholder={props.listingTitle} variant="filled" mb={3} type="text" id="title" />
                    <Input disabled={props.disabled} onChange={listingPriceOnChange} placeholder={props.listingPrice.toString()} variant="filled" mb={3} type="text" id="price" />
                    <Input disabled={props.disabled} onChange={listingDescriptionOnChange} placeholder={props.listingDescription} mb={3} variant="filled" type="text" id="description" />
                    <Input disabled={props.disabled} onChange={listingPostCodeOnChange} placeholder={props.listingPostCode.toString()} mb={3} variant="filled" type="text" id="postcode" />
                    <Select disabled={props.disabled} onChange={listingTypeOnChange} placeholder={"Type: (Product or Service"} mb={3} variant="filled" id="type">
                        <option value="product">Product</option>
                        <option value="service">Service</option>
                    </Select>
                    <Select disabled={props.disabled} onChange={listingCategoryOnChange} placeholder={"Category"} mb={3} variant="filled" id="category">
                        <option value="goodcondition">Good Condition</option>
                        <option value="wellused">Well Used</option>
                        <option value="barelyused">Barely Used</option>
                        <option value="unused">Unused</option>
                        <option value="qualified">Qualified</option>
                        <option value="qualandcert">Qualified and Certified</option>
                        <option value="unqualanduncert">Unqualified and Uncertified</option>
                    </Select>
                    <Select disabled={props.disabled} onChange={listingConditionOnChange} placeholder={"Condition"} mb={3} variant="filled" id="condition">
                        <option value="now">Now</option>
                        <option value="dateandtime">Date and Time</option>
                        <option value="preorder">Preorder</option>
                        <option value="now">Now</option>
                        <option value="date">Date</option>
                    </Select>
                    <Input disabled={props.disabled} onChange={listingImageURLOnChange} placeholder={props.listingImageURL} variant="filled" mb={3} id="imageurl" />
                </ModalBody>
                <ModalFooter>
                    <Flex width="100%">
                        <Button id="edit" onClick={onEditListing}>
                            Edit Listing
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

export default EditListing;