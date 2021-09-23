import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import Index from './components/forms/index';

function App() {
  const IndexPage = () => {
    return <Index />;
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <IndexPage></IndexPage>
    </Flex>
  );
}

export default App;
