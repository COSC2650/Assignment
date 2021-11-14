import { Image, Heading, Text, HStack, Checkbox } from '@chakra-ui/react';

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
  userID: number;
  userFirstName: string;
  userLastName: string;
  userStreet: string;
  userCity: string;
  userState: string;
  userPostCode: string;
  userEmail: string;
  userPasswordHash: string;
  userEmailVerified: boolean;
  roleID: number;
  isChecked: string;
}

//checked item iterator and checked item array
let checkboxHashmap = new Map([]);

//on checkboxOnChange adds item hashmap
const checkboxOnChange = (e) => {
  if (checkboxHashmap.get(e.target.value) === e.target.value) {
    checkboxHashmap.delete(e.target.value);
    console.log(checkboxHashmap);
    console.log('delete');
  } else {
    checkboxHashmap.set(e.target.value, e.target.value);
    console.log(checkboxHashmap);
    console.log('add');
  }
};

//iterates through hashmap deleting items
function deleteItems() {
  checkboxHashmap.forEach((checkedItem) => {
    checkboxHashmap.delete(checkedItem);
    console.log('deleted');
  });
  window.location.reload();
}

//list item fragment
const ListItem = (props: ListItemProp) => {
  if (props.listingID && !props.userID) {
    return (
      <HStack align="flex-start" width="100%" alignItems="center">
        <Checkbox
          value={props.listingID}
          onChange={(e) => checkboxOnChange(e)}
        ></Checkbox>
        <Image 
          borderRadius=".5rem"
          boxSize="3rem"
          src={props.listingImageURL}
          onClick={deleteItems}
        />
        <HStack align="left">
          <Heading as="h1" size="md" id="heading">
            {props.listingTitle}
          </Heading>
          <Text size="md" id="postcode">
            {'Postcode - ' + props.listingPostCode}
          </Text>
          <Text size="md" id="price">
            {'Price - ' + props.listingPrice}
          </Text>
        </HStack>
      </HStack>
    );
  }
  if (props.userID) {
    return (
      <HStack align="flex-start" width="100%" alignItems="center">
        <Checkbox
          marginTop="auto"
          value={props.userID}
          onChange={(e) => checkboxOnChange(e)}
        ></Checkbox>
        <HStack align="left">
          <Heading as="h1" size="md" id="heading" onClick={deleteItems}>
            {props.userFirstName}
          </Heading>
          <Text size="md" id="contents">
            {props.userLastName}
          </Text>
          <Text size="md" id="postcode">
            {'Email - ' + props.userEmail}
          </Text>
          <Text size="md" id="price">
            {'Postcode - ' + props.userPostCode}
          </Text>
        </HStack>
      </HStack>
    );
  } else {
    return (
      <HStack align="flex-start" width="100%" alignItems="center">
        <Checkbox
          marginTop="auto"
          value={props.listingID}
          onChange={(e) => checkboxOnChange(e)}
        ></Checkbox>
        <Image
          borderRadius=".5rem"
          boxSize="3rem"
          src={props.listingImageURL}
          onClick={deleteItems}
        />
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
  }
};

export default ListItem;
