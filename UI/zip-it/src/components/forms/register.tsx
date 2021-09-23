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

//register component
export function Register() {
  const { switchToLogin } = useContext(AccountContext);
  const { switchToFilter } = useContext(AccountContext);
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex direction="column" background={formBackground} p={12} rounded={6}>
      <Heading textAlign="center" mb={6}>
        Register to Zip-It!
      </Heading>
      <Input
        placeholder="your@email.com"
        variant="filled"
        mb={3}
        type="email"
        id="email"
      />
      <Input
        placeholder="First Name"
        variant="filled"
        mb={6}
        type="name"
        id="firstName"
      />
      <Input
        placeholder="Last Name"
        variant="filled"
        mb={6}
        type="name"
        id="lastName"
      />
      <Input
        placeholder="Password"
        variant="filled"
        mb={6}
        type="password"
        id="password"
      />
      <Input
        placeholder="Confirm Password"
        variant="filled"
        mb={6}
        type="password"
        id="password"
      />
      <Button onClick={switchToFilter} colorScheme="teal" mb={6} id="register">
        Register
      </Button>
      <Button onClick={switchToLogin} mb={6}>
        Back to Login
      </Button>
      <Button onClick={toggleColorMode} id="color_mode">
        Toggle Colour mode
      </Button>
    </Flex>
  );
}
// }

export default Register;
