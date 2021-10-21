import { Image, Heading, Text, HStack, VStack } from "@chakra-ui/react";

export interface ListItemProp {
    imageUrl: string;
    listingID: string;
    postCode: number;
    title: string;
    category: string;
    condition: string;
    availibility: string;
    description: string;
    price: number;
    quantity: number;
}

const ListItem = (props: ListItemProp) => {
    return (
        <HStack align="flex-start" width="100%">
            <Image borderRadius="10px" boxSize="75px" src={props.imageUrl} />
            <VStack align="left">
                <Heading as="h1" size="md" id="heading">
                    {props.title}
                </Heading>
                <Text size="md" id="contents">{props.description}</Text>
            </VStack>
        </HStack>
    );
};

export default ListItem;
