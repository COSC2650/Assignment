import { useState } from 'react';
import { Login } from './login';
import { Register } from './register';
import { Filter } from './filter';
import { AccountContext } from './accountContext';

function Index() {
  const switchToRegister = () => {
    setTimeout(() => {
      setActive('register');
    }, 400);
  };

  const switchToLogin = () => {
    setTimeout(() => {
      setActive('login');
    }, 400);
  };

  const switchToFilter = () => {
    setTimeout(() => {
      setActive('filter');
    }, 400);
  };

  const [active, setActive] = useState('login');
  const contextValue = { switchToRegister, switchToLogin, switchToFilter };

  return (
    <AccountContext.Provider value={contextValue}>
      <div>
        {active === 'login' && <Login />}
        {active === 'register' && <Register />}
        {active === 'filter' && <Filter />}
      </div>
    </AccountContext.Provider>
  );
}

export default Index;
