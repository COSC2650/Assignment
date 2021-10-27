import Search, { SearchProps, SearchDetails } from "./search";
import { configure, render, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("Search", () => {
  it("Should render correctly", () => {
    const props: SearchProps = {
      onSearchInterface: (ldprops: SearchDetails) => {
        // Intentional
      },
    };
    const component = render(<Search {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("Should invoke query", () => {
    
    //create mock api call
    const mockOnSearchCallBack = jest.fn();

    //apply it to the onSearch interface
    const props: SearchProps = {
      onSearchInterface: mockOnSearchCallBack,
    };

     // Render the component in a hidden state
     const wrapper = mount(<Search {...props} />);

     wrapper.find('Button').simulate('click');

    // Check that the callback was called
    expect(mockOnSearchCallBack.mock.calls.length).toEqual(1);
  });
});
