import { Flex, Spacer } from '@chakra-ui/layout';
import {
  IconButton,
  useColorModeValue,
  Button,
  Image,
  Icon,
  Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';

interface HeaderProps {
  toggleColorMode(): void;
  toggleLogIn(): void;
  userName: String;
  logInOutLabel: String;
}

const Filter = (props: HeaderProps) => {
  const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const headerBackground = useColorModeValue('gray.700', 'gray.100');
  const textColor = useColorModeValue('gray.100', 'gray.700');
  const logo = useColorModeValue(
    '/images/logo_white.png',
    '/images/logo_black.png'
  );

  const toggleColor = () => {
    props.toggleColorMode();
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <Flex
      align="right"
      width="100vw"
      position="fixed"
      top="0"
      left="0"
      zIndex="999"
      padding="5px"
      justify="right"
      background={headerBackground}
      id="color_mode"
    >
      <Heading
        as="h5"
        size="sm"
        color="#000000"
        display="flex"
        alignItems="center"
      >
        Welcome {props.userName}
      </Heading>

      <Spacer />
      <Image src={logo} height="40px" align="left" />
      <Spacer />
      <IconButton
        onClick={toggleColor}
        display={['block', 'none']}
        borderColor={textColor}
        marginLeft="5px"
        borderWidth="1px"
        color={textColor}
        backgroundColor={headerBackground}
        aria-label="Theme"
        icon={colorModeIcon}
      />
      <Button
        onClick={toggleColor}
        display={['none', 'block']}
        leftIcon={colorModeIcon}
        borderColor={textColor}
        marginLeft="5px"
        borderWidth="1px"
        color={textColor}
        backgroundColor={headerBackground}
        aria-label="Log in"
      >
        Theme
      </Button>
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
        aria-label="Log in"
      >
        {props.logInOutLabel}
      </Button>
    </Flex>
  );
};

export default Filter;
