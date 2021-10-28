import { configure, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import { expect } from '@jest/globals';
import { Button } from '@chakra-ui/react';
import { IconButton} from '@chakra-ui/react';

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('LoginButton', () => {
  it('Should render correctly', () => {
    

    const component = render(
      <>
        <IconButton aria-label="Log in" />
        <Button />
      </>
    );
    expect(component).toMatchSnapshot();
  });
});
