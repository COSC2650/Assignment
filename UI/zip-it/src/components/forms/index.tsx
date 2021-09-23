import { useState } from 'react';
import { Login } from './login';
import { Register } from './register';
import { AccountContext } from './accountContext';

function Index() {
  const switchToRegister = () => {
    setTimeout(() => {
      setActive('signup');
    }, 400);
  };

  const switchToLogin = () => {
    setTimeout(() => {
      setActive('signin');
    }, 400);
  };

  const [active, setActive] = useState('signin');
  const contextValue = { switchToRegister, switchToLogin };

  return (
    <AccountContext.Provider value={contextValue}>
      <div>
        {active === 'signin' && <Login />}
        {active === 'signup' && <Register />}
      </div>
    </AccountContext.Provider>
  );
}

export default Index;
