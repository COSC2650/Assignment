import React from 'react';
import {
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  BoldLink,
} from './common';
import { Marginer } from '../marginer';

export function LoginForm(props) {
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Signin</SubmitButton>

      <MutedLink href="#">
        Don't have an accoun? <BoldLink href="#">Signup</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
