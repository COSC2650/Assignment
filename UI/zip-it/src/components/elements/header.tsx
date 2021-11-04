import { Flex, Spacer } from '@chakra-ui/layout';
import {
  IconButton,
  useColorModeValue,
  Button,
  Image,
  Heading,
  Icon,
} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
  EditIcon,
  ExternalLinkIcon,
  AddIcon,
  LockIcon,
} from '@chakra-ui/icons';
import LogOutButton from './logoutbutton';
import LogInButton from './loginbutton';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

interface HeaderProps {
  toggleColorMode(): void;
  toggleLogIn(): void;
  toggleLogout(): void;
  createNewListing(): void;
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

  function UserMenu() {
    if (props.authenticated) {
      return (
        <Menu>
          <MenuButton
            as={Button}
            display={['none', 'block']}
            leftIcon={<Icon as={LockIcon} />}
            borderColor={textColor}
            marginLeft="5px"
            borderWidth="1px"
            color={textColor}
            backgroundColor={headerBackground}
            aria-label="Log in"
          >
            {'Account Settings'}
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<AddIcon />}
              onClick={props.createNewListing}>
              New Listing
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} >
              Current Listings
            </MenuItem>
            <MenuItem icon={<EditIcon />}
              onClick={props.accountSettings}>
              Manage Profile
            </MenuItem>
          </MenuList>
        </Menu>
      );
    } else {
      return (
        <Menu>
        </Menu>
      );
    }
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

      <UserMenu />

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
