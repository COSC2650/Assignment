import { 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  RadioGroup,
  Radio,
  Stack } from "@chakra-ui/react";
  import { useState } from 'react';

export interface ListingDetails {
    listingImageURL: string;
    listingTitle: string;
    listingDescription: string;
    listingPrice: number;
    listingQuantity: number;
    listingID: string;
    listingPostcode: number;
    listingCategory: string;
    listingCondition:string;
    listingAvailibility: string;
    listingType: string;
}

export interface ListingProps {
  disabled: boolean;
  onSelectListing(props: ListingDetails): void;
  onClose(): void;
  visible: boolean;
}


export function ListingInfoDrawer(props: ListingProps) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = useState("right")
  

  return (
    <>

    <RadioGroup defaultValue={placement} onChange={setPlacement}>
      <Stack direction="row" mb="4">
        <Radio value="top">Top</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
      </Stack>
    </RadioGroup>

    <Button colorScheme="teal" onClick={onOpen}>
        Open
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
      </Drawer>
      </>
  );
}

export default ListingInfoDrawer;
