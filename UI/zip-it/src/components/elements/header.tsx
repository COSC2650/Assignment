import {
  AddIcon,
  CloseIcon,
  EditIcon,
  HamburgerIcon,
  MoonIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon
} from '@chakra-ui/icons';
import { Flex, Spacer } from '@chakra-ui/layout';
import {
  Button,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue
} from '@chakra-ui/react';
import LogInButton from './loginbutton';

interface HeaderProps {
  toggleColorMode(): void;
  toggleLogIn(): void;
  toggleLogout(): void;
  NewListing(): void;
  UserProfile(): void;
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

  const toggleColor = () => {
    props.toggleColorMode();
    (document.activeElement as HTMLElement).blur();
  };

  if (props.authenticated) {
    authenticateButton = <BurgerMenu />;
    userTitle = props.userTitle;
  } else {
    authenticateButton = (
      <>
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
        <LogInButton toggleLogIn={props.toggleLogIn} />
      </>
    );
    userTitle = props.userTitle;
  }

  function BurgerMenu() {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          color="black"
        />
        <MenuList>
          <MenuItem icon={<AddIcon />} onClick={props.NewListing}>
            New Listing
          </MenuItem>
          <MenuItem icon={<EditIcon />} onClick={props.UserProfile}>
            User Profile
          </MenuItem>
          <MenuItem icon={colorModeIcon} command="" onClick={toggleColor}>
            Switch Color Theme
          </MenuItem>
          <MenuItem icon={<CloseIcon />} onClick={props.toggleLogout}>
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
      <a href="\">
        <Image src={logo} height="40px" align="left" />
      </a>
      <Spacer />
      {authenticateButton}
    </Flex>
  );
};

export default Header;
