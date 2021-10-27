import { configure, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import { expect } from '@jest/globals';
import { Button } from '@chakra-ui/react';
import IconButton, { LogInProps } from '../elements/loginbutton';

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('LoginButton', () => {
  it('Should render correctly', () => {
    const props: LogInProps = {
      toggleLogIn: () => {
        //Intentional
      },
    };

    const component = render(
      <>
        <IconButton {...props} />
        <Button {...props} />
      </>
    );
    expect(component).toMatchSnapshot();
  });
});
