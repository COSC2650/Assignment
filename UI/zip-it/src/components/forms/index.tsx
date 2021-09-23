import React from 'react';
import { Login } from './login';
import { Register } from './register';

function Index() {
  //main index viewport component
  const LoginPage = () => {
    return <Login />;
  };
  const RegisterPage = () => {
    return <Register />;
  };
  return (
    <>
      <LoginPage></LoginPage>
      <RegisterPage></RegisterPage>
    </>
  );
}

export default Index;
