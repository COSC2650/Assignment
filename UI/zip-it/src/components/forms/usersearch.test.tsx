import Search, { UserSearchProps, SearchDetails } from './usersearch';
import { configure, render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('Search Component', () => {
  it('Should render correctly', () => {
    const props: UserSearchProps = {
      onSearchInterface: (ldprops: SearchDetails) => {
        // Intentional
      },
      userPostCode: 3000,
    };
    const component = render(<Search {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('Should invoke query', () => {
    //create mock api call
    const mockOnSearchCallBack = jest.fn();

    //apply it to the onSearch interface
    const props: UserSearchProps = {
      onSearchInterface: mockOnSearchCallBack,
      userPostCode: 3000,
    };

    // Render the component
    const wrapper = mount(<Search {...props} />);

    // Enter details in the fields
    wrapper
      .find('Input#postcodeselect')
      .simulate('change', { target: { value: '4000' } });
    wrapper
      .find('Select#listingselect')
      .simulate('change', { target: { value: 'product' } });

    //to be added as search logic developed further

    //simulate button click
    wrapper.find('Button').simulate('click');

    //check that the callback was called
    expect(mockOnSearchCallBack.mock.calls.length).toEqual(2);

    //check that results were returned
  });
});
