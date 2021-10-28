import { useState } from 'react';
import Header from './components/elements/header';
import { useColorMode, useToast } from '@chakra-ui/react';
import Login, { LoginDetails } from './components/forms/login';
import Logout, { LogoutDetails } from './components/forms/logout';
import Register, { RestrationDetails } from './components/forms/register';
import query from './data/queries';
import clientConnection from './data/client';
import { Listings } from "./components/display/itemlist";
import NewListing, { newListingDetails } from './components/forms/newListing';

function App() {
  const [userTitle, setUserTitle] = useState('Welcome');
  const [userID, grabUserID] = useState(false);
  const [userPostcode, grabUserPostcode] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [newListingVisible, setNewListingVisible] = useState(false);
  const { toggleColorMode } = useColorMode();
  const onShowLogin = () => {
    setNewListingVisible(false);
    setLoginVisible(true);
    setLogoutVisible(false);
    setRegisterVisible(false);
  };
  const onShowRegister = () => {
    setNewListingVisible(false);
    setLogoutVisible(false);
    setLoginVisible(false);
    setRegisterVisible(true);
  };
  const onShowLogout = () => {
    setNewListingVisible(false);
    setLogoutVisible(true);
    setLoginVisible(false);
    setRegisterVisible(false);
  };
  const onShowNewListing = () => {
    setNewListingVisible(true);
    setLogoutVisible(false);
    setLoginVisible(false);
    setRegisterVisible(false);
}


  const onLogInClose = () => setLoginVisible(false);
  const onLogoutClose = () => setLogoutVisible(false);
  const onRegisterClose = () => setRegisterVisible(false);
  const onNewListingClose = () => setNewListingVisible(false);

  const toast = useToast();
  const validationToast = () =>
    toast({
      title: 'Sorry invalid - Try again?',
      description: 'Invalid credentials.',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  const errorToast = () =>
    toast({
      title: 'Sorry the system is down - Try later',
      description: 'Invalid credentials.',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });

  //Logic for Login function
  const onLogin = (props: LoginDetails) => {
    setDisableInput(true);

    //invoke client
    const client = clientConnection();

    //query database + pass result to
    client
      .query(query(props))
      .then((result) => {
        const queryResult = result.data.userByEmail;
        if (queryResult != null) {
          //set user data
          setUserTitle('Welcome back ' + queryResult.firstName);
          grabUserID(queryResult.userID);
          grabUserPostcode(queryResult.userPostcode);
          setAuthenticated(true);

          //login confirmation
          toast({
            title: 'Logged In',
            description: 'You have been successfully logged in.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });

          //hide login
          setLoginVisible(false);
        } else {
          validationToast();
          setLoginVisible(false);
          setDisableInput(false);
        }
      })
      //catch apollo/graphQL failure
      .catch((result) => {
        errorToast();
        setLoginVisible(false);
        setDisableInput(false);
      });
  };

  //logic for logout function
  const onLogout = (props: LogoutDetails) => {
    //log out confirmation
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });

    //setheader title and authentication status
    setUserTitle('Welcome');
    setAuthenticated(false);
    setDisableInput(false);

    //hide login
    setLogoutVisible(false);
  };
  const onRegister = (props: RestrationDetails) => {
    if (true) {
      toast({
        title: 'Account Created',
        description: 'Your account has been created.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else {
      errorToast();
    }

    setRegisterVisible(false);
  };

  const onNewListing = (props: newListingDetails) => {
    if (true) {
      toast({
        title: 'New Listing Created',
        description: 'Your new listing has been created.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } else {
      errorToast();
    }

    setNewListingVisible(false);
  };

  return (
    <>
      <Header
        toggleColorMode={toggleColorMode}
        toggleLogIn={onShowLogin}
        toggleLogout={onShowLogout}
        toggleNewListing={onShowNewListing}
        userTitle={userTitle}
        authenticated={authenticated}
      ></Header>
      <Login
        disabled={disableInput}
        visible={loginVisible}
        onOpenRegister={onShowRegister}
        onLogin={onLogin}
        onClose={onLogInClose}
      ></Login>
      <Logout
        visible={logoutVisible}
        onLogout={onLogout}
        onClose={onLogoutClose}
      ></Logout>
      <Register
        visible={registerVisible}
        onOpenLogin={onShowLogin}
        onRegister={onRegister}
        onClose={onRegisterClose}
      ></Register>
      <NewListing
        visible={newListingVisible}
        onNewListing={onNewListing}
        onClose={onNewListingClose}
      ></NewListing>
      <Listings />
    </>
  );
}

export default App;
