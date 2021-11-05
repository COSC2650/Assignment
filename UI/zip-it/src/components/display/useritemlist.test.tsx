import { configure, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import UserListings from "./useritemlist";

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("Item List", () => {
  it("should match snapshot", () => {
    const componenet = render(<UserListings userPostCode={0}/>);
    expect(componenet).toMatchSnapshot();
  });
});
