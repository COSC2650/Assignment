import {
  Heading, 
  HStack,  
  Text, 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react';

//listItem properties
export interface ListItemProp {
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

  const { isOpen,onOpen, onClose } = useDisclosure();

  return (
      <>
        <HStack align="flex-start" width="100%" onClick={onOpen}>
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
              {'$' + props.listingPrice}
            </Text>
          </HStack>
        </HStack>
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>{props.listingTitle}</DrawerHeader>

            <DrawerBody>
              <Text> {'Post Code - ' + props.listingPostCode}</Text>
              <Text>{'Category- ' + props.listingCategory}</Text>
              <Text>{'Condition - ' + props.listingCondition}</Text>
              <Text>{'Description: ' + props.listingDescription}</Text>
              <Text>{'Price - $' + props.listingPrice}</Text>
              <Text>{'Type - ' + props.listingType}</Text>
            </DrawerBody>

            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
};



export default ListItem;
