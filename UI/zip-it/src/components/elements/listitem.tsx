import { Image, Heading, Text, HStack, VStack } from "@chakra-ui/react";
import { LoremIpsum } from "react-lorem-ipsum";

interface ListItemProp {
    imageUrl: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
}

const ListItem = (props: ListItemProp) => {
    return (
        <HStack align="flex-start" width="100%">
            <Image borderRadius="10px" boxSize="75px" src={props.imageUrl} />
            <VStack align="left">
                <Heading as="h1" size="md">
                    <LoremIpsum avgSentencesPerParagraph={1} avgWordsPerSentence={4} p={1} />
                </Heading>
                <Text size="md">
                    <LoremIpsum avgSentencesPerParagraph={1} p={1} />
                </Text>
            </VStack>
        </HStack>
    );
};

export default ListItem;
