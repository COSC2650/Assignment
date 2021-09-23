import * as React from 'react';
import { Login } from './components/forms/login';
import { Register } from './components/forms/register';
import { Flex } from '@chakra-ui/layout';

//main index viewport component
const LoginPage = () => {
  return <Login />;
};
const RegisterPage = () => {
  return <Register />;
};

function App() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <LoginPage></LoginPage>,<RegisterPage></RegisterPage>;
    </Flex>
  );
}

export default App;
