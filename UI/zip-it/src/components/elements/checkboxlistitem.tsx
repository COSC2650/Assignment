import {
  Image,
  Heading,
  Text,
  HStack,
  Checkbox,
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
      <Checkbox marginTop="auto" >Checkbox</Checkbox>
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
};

export default ListItem;
