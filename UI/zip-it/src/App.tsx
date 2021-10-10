import { useState } from 'react';
import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import Header from './components/elements/header';
import { useColorMode, useToast } from '@chakra-ui/react';
import Login, { LoginDetails } from './components/forms/login';
import Register, { RestrationDetails } from './components/forms/register';
import ListItem from './components/elements/listitem';
import Search from './components/elements/search';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import query from './graphQL/query';

function App() {
  const [disableInput, setDisableInput] = useState(false);
  const [userName, setUserName] = useState('');
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const { toggleColorMode } = useColorMode();
  const onSubmit = () => setDisableInput(true);
  const onShowLogin = () => setLoginVisible(true);
  const onShowRegister = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };
  const onLogInClose = () => setLoginVisible(false);
  const onRegisterClose = () => setRegisterVisible(false);
  const toast = useToast();
  const errorToast = () =>
    toast({
      title: 'Error occured',
      description: 'An error occured, please retry.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });

  const onLogin = (props: LoginDetails) => {
    onSubmit();
    //creates client connection instance
    const client = new ApolloClient({
      uri: 'http://localhost:9002/graphql',
      cache: new InMemoryCache(),
    });

    //query database
    client.query(query(props.email, props.password)).then((result) => {
      var queryResult = result.data.userByEmail;
      // queryResult = null; -testing

      if (queryResult != null) {
        setUserName(queryResult.FirstName);
        toast({
          title: 'Logged In',
          description: 'You have been successfully logged in.',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });

        setLoginVisible(false);
      } else {
        errorToast();
        setLoginVisible(false);
      }
    });
  };

  const onRegister = (props: RestrationDetails) => {
    if (true) {
      toast({
        title: 'Account Created',
        description: 'Your account has been created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
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
        userName={userName}
      ></Header>
      <Login
        disabled={disableInput}
        visible={loginVisible}
        onOpenRegister={onShowRegister}
        onLogin={onLogin}
        onClose={onLogInClose}
      ></Login>
      <Register
        visible={registerVisible}
        onOpenLogin={onShowLogin}
        onRegister={onRegister}
        onClose={onRegisterClose}
      ></Register>
      <Stack
        direction={['column', 'row']}
        margin="60px 5px 5px 5px"
        divider={<StackDivider />}
        spacing={2}
      >
        <Search></Search>
        <VStack divider={<StackDivider />} spacing={2} width="100%">
          <ListItem
            imageUrl="https://picsum.photos/100?random=1"
            title="Title"
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=2"
            title="Title"
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=3"
            title="Title"
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=4"
            title="Title"
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=5"
            title="Title"
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
        </VStack>
      </Stack>
    </>
  );
}

export default App;
