import Search, { SearchProps, SearchDetails } from "./search";
import { configure, render } from "enzyme";
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
});
