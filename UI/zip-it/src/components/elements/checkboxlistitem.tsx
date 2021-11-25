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
  useDisclosure,
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
  checkBoxToggle(props: ToggleProps): void;
}

export interface ToggleProps {
  listingID: number;
  toggled: boolean;
}

//list item fragment
const ListItem = (props: ListItemProp) => {
  //adds target value and checked status to toggle props
  const checkboxOnChange = (e) => {
    const toggleProps: ToggleProps = {
      listingID: e.target.value,
      toggled: e.target.checked,
    };
    //passing props in to checkbox toggle function
    props.checkBoxToggle(toggleProps);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (props.listingID && !props.userID) {
    

    return (
      <>
        <HStack align="flex-start" width="100%">
        <Checkbox
          marginTop="auto"
          value={props.listingID}
          onChange={(e) => checkboxOnChange(e)}
        ></Checkbox>
          <HStack align="left" onClick={onOpen}>
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

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  if (props.userID) {
    return (
      <HStack align="flex-start" width="100%" alignItems="center">
        <Checkbox
          marginTop="auto"
          value={props.userEmail}
          onChange={(e) => checkboxOnChange(e)}
        ></Checkbox>
        <HStack align="left">
          <Heading as="h1" size="md" id="heading">
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
