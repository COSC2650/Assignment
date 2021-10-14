import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { FocusableElement } from '@chakra-ui/utils';

export interface LogoutDetails {
  authenticated: boolean;
}

export interface LogoutProps {
  onLogout(props: LogoutDetails): void;
  onClose(): void;
  visible: boolean;
}

//logout component
export function Logout(props: LogoutProps) {
  const cancelRef = React.useRef<FocusableElement | HTMLButtonElement>(null);

  const onLogout = () => {
    const logoutDetails: LogoutDetails = {
      authenticated: false,
    };

    props.onLogout(logoutDetails);
  };

  return (
    <AlertDialog
      isOpen={props.visible}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Log out</AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you would like to log out?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button id="close" onClick={props.onClose}>
              Cancel
            </Button>
            <Spacer></Spacer>
            <Button id="log_out" onClick={onLogout}>
              Log out
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Logout;
