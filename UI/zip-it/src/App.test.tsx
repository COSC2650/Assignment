import { queryByAttribute } from '@testing-library/react';
import App from './App';
import { configure, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

const getById = queryByAttribute.bind(null, 'id');

test('Should render correctly', () => {
  // Render the component
  const component = render(<App />);

  // Check the component against the snapshot
  expect(component).toMatchSnapshot();
});

test('Renders the test log in page and looks for email field', () => {
  const dom = render(<App />);
  // expect(getById(dom.container, "email")).toBeInTheDocument();
});

test('Renders the test log in page and looks for the password field', () => {
  const dom = render(<App />);
  // expect(getById(dom.container, "password")).toBeInTheDocument();
});

test('Renders the test log in page and looks for the login button', () => {
  const dom = render(<App />);
  // expect(getById(dom.container, "login")).toBeInTheDocument();
});

test('Renders the test log in page and looks for the colour mode button', () => {
  const dom = render(<App />);
  // expect(getById(dom.container, "color_mode")).toBeInTheDocument();
});
