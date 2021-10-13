import { Flex, Spacer } from '@chakra-ui/layout';
import {
  IconButton,
  useColorModeValue,
  Button,
  Image,
  Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import LogOutButton from './logoutbutton';
import LogInButton from './loginbutton';

interface HeaderProps {
  toggleColorMode(): void;
  toggleLogIn(): void;
  toggleLogout(): void;
  userTitle: String;
  authenticated: boolean;
}

const Header = (props: HeaderProps) => {
  const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const headerBackground = useColorModeValue('gray.700', 'gray.100');
  const textColor = useColorModeValue('gray.100', 'gray.700');
  const logo = useColorModeValue(
    '/images/logo_white.png',
    '/images/logo_black.png'
  );

  let authenticateButton = <LogInButton toggleLogIn={props.toggleLogIn} />;
  let userTitle;
  if (props.authenticated!) {
    authenticateButton = <LogOutButton toggleLogIn={props.toggleLogout} />;
    userTitle = props.userTitle;
  } else {
    authenticateButton = <LogInButton toggleLogIn={props.toggleLogIn} />;
    userTitle = props.userTitle;
  }

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
        {userTitle}
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
      {authenticateButton}
    </Flex>
  );
};

export default Header;
