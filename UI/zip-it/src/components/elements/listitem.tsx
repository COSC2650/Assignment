<<<<<<< HEAD
import { 
    Image, 
    Heading, 
    Text, 
    HStack, 
    VStack,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input
} from "@chakra-ui/react";


//listItem properties
export interface ListingItemProps {
    listingImageURL: string;
    listingID: string;
    listingPostcode: number;
    listingTitle: string;
    listingCategory: string;
    listingCondition: string;
    listingAvailibility: string;
    listingDescription: string;
    listingPrice: number;
    listingQuantity: number;
    listingType: string;
}

//list item fragment 
const ListItem = (props: ListingItemProps) => {

    
    const { isOpen, onOpen, onClose } = useDisclosure()
    

    return (

        <>
        <Button
            variant="ghost"
            height="200px"
            width="200px"
            onClick={onOpen}>
            <HStack
                align="flex-start"
                h="100px"
                width="80%"
            >
                <Image borderRadius="10px" boxSize="75px" src={props.listingImageURL} />
                <VStack align="left">
                    <Heading as="h1" size="md" id="heading">
                        {props.listingTitle}
                    </Heading>
                    <Text size="md" id="contents">{props.listingDescription}</Text>
                </VStack>
            </HStack>
        </Button>
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
        >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer></>
        
    );
=======
import {
  Heading, HStack, Image, Text
} from '@chakra-ui/react';

//listItem properties
export interface ListItemProp {
  listingImageURL: string;
  listingID: string;
  listingPostCode: number;
  listingTitle: string;
  listingCategory: string;
  listingCondition: string;
  listingAvailibility: string;
  listingDescription: string;
  listingPrice: number;
  listingQuantity: number;
  listingType: string;
}

//list item fragment
const ListItem = (props: ListItemProp) => {
  return (
    <HStack align="flex-start" width="100%">
      <Image borderRadius=".5rem" boxSize="3rem" src={props.listingImageURL} />
      <HStack align="left">
        <Heading as="h1" size="md" id="heading">
          {props.listingTitle}
        </Heading>
        <Text size="md" id="contents">
          {props.listingDescription}
        </Text>
        <Text size="md" id="postcode">
          {'Postcode - ' + props.listingPostCode}
        </Text>
        <Text size="md" id="price">
          {'Price - ' + props.listingPrice}
        </Text>
      </HStack>
    </HStack>
  );
>>>>>>> ca3f78e63c4707a8b9002b4186ae26fd612ef0c3
};

export default ListItem;
