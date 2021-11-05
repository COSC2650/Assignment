import React from 'react';
import { IconButton, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

export interface LogInProps {
  toggleLogIn(): void;
}

const LogInButton = (props: LogInProps) => {
  const textColor = useColorModeValue('gray.100', 'gray.700');
  const headerBackground = useColorModeValue('gray.700', 'gray.100');

  return (
    <>
      <IconButton
        onClick={props.toggleLogIn}
        display={['block', 'none']}
        borderColor={textColor}
        marginLeft="5px"
        borderWidth="1px"
        color={textColor}
        backgroundColor={headerBackground}
        aria-label="Log in"
        icon={<Icon as={FaUser} />}
      />
      <Button
        onClick={props.toggleLogIn}
        display={['none', 'block']}
        leftIcon={<Icon as={FaUser} />}
        borderColor={textColor}
        marginLeft="5px"
        borderWidth="1px"
        color={textColor}
        backgroundColor={headerBackground}
        aria-label="Register/Log in"
      >
        {'Login'}
      </Button>
    </>
  );
};

export default LogInButton;
