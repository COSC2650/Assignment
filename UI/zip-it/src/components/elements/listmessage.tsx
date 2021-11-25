import { Heading, HStack, Text } from '@chakra-ui/react';

export interface MessageProp {
  senderName: string;
  messageDesc: string;
  senderEmail: string;
}

const MessageItem = (props: MessageProp) => {

  return (
    <>
      <HStack align="flex-start" width="100%">
        <HStack align="left">
          <Heading as="h1" size="md" id="heading">
            {props.messageDesc}
          </Heading>
          <Text size="md" id="listing">
            {props.senderName}
          </Text>
          <Text size="md" id="sender">
            {props.senderEmail}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

export default MessageItem;