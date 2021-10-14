import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
} from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/layout';
import { useState } from 'react';

export interface LoginDetails {
  email: string;
  password: string;
}

export interface LoginProps {
  disabled: boolean;
  onLogin(props: LoginDetails): void;
  onOpenRegister(): void;
  onClose(): void;
  visible: boolean;
}

//login component
export function Login(props: LoginProps) {
  const [formValidationMessage, setFormValidationMessage] = useState('');
  const [formValidationHidden, setFormValidationHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailOnChange = (event) => setEmail(event.target.value);
  const passwordOnChange = (event) => setPassword(event.target.value);

  const onLogin = () => {
    const loginDetails: LoginDetails = {
      email: email,
      password: password,
    };

    // Email regex
    var regexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

    setFormValidationHidden(false);

    if (email === '' || !regexp.test(email)) {
      setFormValidationMessage('Your email is empty or invalid');
    } else if (password === '') {
      setFormValidationMessage('Your passwork is empty');
    } else {
      setFormValidationHidden(true);
      props.onLogin(loginDetails);
    }
  };

  return (
    <FormControl>
      <Modal isOpen={props.visible} onClose={props.onClose} id="login">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ready? Set? Zip-It!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="error" hidden={formValidationHidden} mb={3}>
              <AlertIcon />
              <AlertDescription>{formValidationMessage}</AlertDescription>
            </Alert>
            <Input
              disabled={props.disabled}
              onChange={emailOnChange}
              placeholder="your@email.com"
              variant="filled"
              mb={3}
              type="email"
              id="email"
            />
            <Input
              disabled={props.disabled}
              onChange={passwordOnChange}
              placeholder="********"
              variant="filled"
              type="password"
              id="password"
            />
          </ModalBody>

          <ModalFooter>
            <Flex width="100%">
              <Button
                onClick={props.onOpenRegister}
                id="register"
                disabled={props.disabled}
              >
                Register
              </Button>
              <Spacer></Spacer>
              <Button onClick={onLogin} id="login" disabled={props.disabled}>
                Log In
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  );
}

export default Login;
