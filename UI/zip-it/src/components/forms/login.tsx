import { useContext } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { AccountContext } from './accountContext';

//login component
export function Login() {
  const { switchToRegister } = useContext(AccountContext);
  const { switchToFilter } = useContext(AccountContext);
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading textAlign="center" mb={6}>
          Ready? Set? Zip-It!
        </Heading>
        <Input
          placeholder="your@email.com"
          variant="filled"
          mb={3}
          type="email"
          id="email"
        />
        <Input
          placeholder="********"
          variant="filled"
          mb={6}
          type="password"
          id="password"
        />
        <Button onClick={switchToFilter} colorScheme="teal" mb={6} id="login">
          Login
        </Button>
        <Button onClick={switchToRegister} mb={6}>
          Register!
        </Button>
        <Button onClick={toggleColorMode} id="color_mode">
          Toggle Colour mode
        </Button>
      </Flex>
    </Flex>
  );
}
// }

export default Login;
