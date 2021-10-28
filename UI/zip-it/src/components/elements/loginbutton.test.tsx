import { configure, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { IconButton, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("LoginButton", () => {
  it("Should render correctly", () => {
    const component = render(
      <>
        <IconButton
          display={["block", "none"]}
          marginLeft="5px"
          borderWidth="1px"
          aria-label="Log in"
          icon={<Icon as={FaUser} />}
        />
        <Button
          display={["none", "block"]}
          leftIcon={<Icon as={FaUser} />}
          marginLeft="5px"
          borderWidth="1px"
          aria-label="Log in"
        >
          {"Log In"}
        </Button>
      </>
    );
    expect(component).toMatchSnapshot();
  });
});
