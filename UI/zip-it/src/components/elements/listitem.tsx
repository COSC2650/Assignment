import { Image, Heading, Text, HStack, VStack } from "@chakra-ui/react";

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
      <Image borderRadius="10px" boxSize="75px" src={props.listingImageURL} />
      <VStack align="left">
        <Heading as="h1" size="md" id="heading">
          {props.listingTitle}
        </Heading>
        <Text size="md" id="contents">
          {props.listingDescription}
        </Text>
        <Text size="md" id="postcode">
          {"Postcode - " + props.listingPostCode}
        </Text>
      </VStack>
    </HStack>
  );
};

export default ListItem;
