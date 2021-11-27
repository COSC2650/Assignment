import ListItem, { ListItemProp } from './listitem';
import { configure, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { describe, expect } from '@jest/globals';

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('ListItem', () => {
  const props: ListItemProp = {
    listingTitle: 'Test Title',
    listingDescription: 'Test Description',
    listingPrice: 100.0,
    listingQuantity: 10,
    listingID: '',
    listingPostCode: 0,
    listingCategory: '',
    listingCondition: '',
    listingAvailibility: '',
    listingType: ''
  };

  it('Should render correctly', () => {
    const component = render(<ListItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('Title should be correct', () => {
    const wrapper = render(<ListItem {...props} />);
    expect(wrapper.find('h1#heading').text()).toEqual(props.listingTitle);
  });

  it('Description should be correct', () => {
    const wrapper = render(<ListItem {...props} />);
    expect(wrapper.find('#contents').text()).toEqual(props.listingDescription);
  });
});
