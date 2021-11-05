import { Flex, Spacer } from '@chakra-ui/layout';
import {
  IconButton,
  useColorModeValue,
  Button,
  Image,
  Heading,
} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
  EditIcon,
  ExternalLinkIcon,
  AddIcon,
  HamburgerIcon,
  RepeatIcon
} from '@chakra-ui/icons';
import LogInButton from './loginbutton';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

interface HeaderProps {
  toggleColorMode(): void;
  toggleLogIn(): void;
  toggleLogout(): void;
  toggleNewListing(): void;
  accountSettings(): void;
  userTitle: string;
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

  let authenticateButton;
  let userTitle;

  if (props.authenticated) {
    authenticateButton =       <BurgerMenu />;
    userTitle = props.userTitle;
  } else {
    authenticateButton = <LogInButton toggleLogIn={props.toggleLogIn} />;
    userTitle = props.userTitle;
  }

  const toggleColor = () => {
    props.toggleColorMode();
    (document.activeElement as HTMLElement).blur();
  };

  function BurgerMenu() {

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          color = "black"
        />
        <MenuList>
          <MenuItem
          icon={<AddIcon />}
          onClick={props.toggleNewListing}>
            New Listing
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="">
            Current Listings
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="">
            Account Settings
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="">
            User Profile
          </MenuItem>
          <MenuItem icon={<EditIcon />} onClick={props.toggleLogout}>
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

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
        color={textColor}
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
