import { useState } from "react";
import Header from "./components/elements/header";
import { useColorMode, useToast } from "@chakra-ui/react";
import Login, { LoginDetails } from "./components/forms/login";
import Logout, { LogoutDetails } from "./components/forms/logout";
import Register, { RestrationDetails } from "./components/forms/register";
import query from "./data/queries";
import clientConnection from "./data/client";
import { Listings } from "./components/display/itemlist";

function App() {
  const [userTitle, setUserTitle] = useState("Welcome");
  const [authenticated, setAuthenticated] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const { toggleColorMode } = useColorMode();
  const onShowLogin = () => {
    setLoginVisible(true);
    setLogoutVisible(false);
    setRegisterVisible(false);
  };
  const onShowRegister = () => {
    setLogoutVisible(false);
    setLoginVisible(false);
    setRegisterVisible(true);
  };
  const onShowLogout = () => {
    setLogoutVisible(true);
    setLoginVisible(false);
    setRegisterVisible(false);
  };
  const onLogInClose = () => setLoginVisible(false);
  const onLogoutClose = () => setLogoutVisible(false);
  const onRegisterClose = () => setRegisterVisible(false);
  const toast = useToast();
  const validationToast = () =>
    toast({
      title: "Sorry invalid - Try again?",
      description: "Invalid credentials.",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  const errorToast = () =>
    toast({
      title: "Sorry the system is down - Try later",
      description: "Invalid credentials.",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

  //Logic for Login fucntion
  const onLogin = (props: LoginDetails) => {
    setDisableInput(true);

    //invoke client
    const client = clientConnection();

    //query database + pass result to
    client
      .query(query(props))
      .then((result) => {
        const queryResult = result.data.userByEmail;
        if (queryResult.userEmail != null) {
          //set user data
          setUserTitle("Welcome back " + queryResult.userFirstName);
          setAuthenticated(true);

          //login confirmation
          toast({
            title: "Logged In",
            description: "You have been successfully logged in.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
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
      title: "Logged out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    //setheader title and authentication status
    setUserTitle("Welcome");
    setAuthenticated(false);
    setDisableInput(false);

    //hide login
    setLogoutVisible(false);
  };
  const onRegister = (props: RestrationDetails) => {
    if (true) {
      toast({
        title: "Account Created",
        description: "Your account has been created.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      errorToast();
    }

    setRegisterVisible(false);
  };

  return (
    <>
      <Header
        toggleColorMode={toggleColorMode}
        toggleLogIn={onShowLogin}
        toggleLogout={onShowLogout}
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
      <Listings />
    </>
  );
}

export default App;
