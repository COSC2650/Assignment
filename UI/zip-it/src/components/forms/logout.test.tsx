import { Logout, LogoutProps } from "./logout";
import { configure, mount, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("LogOut", () => {
    it("Should render correctly", () => {
        const props: LogoutProps = {
            onLogout: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        const component = render(<Logout {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Visibility should change", () => {
        const props: LogoutProps = {
            onLogout: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Logout {...props} />);

        // Check that it is not visible
        expect(wrapper.find("AlertDialog").prop("isOpen")).toEqual(false);

        // Change the component to a visible state
        wrapper.setProps({ visible: true });

        // Check that it is visible
        expect(wrapper.find("AlertDialog").prop("isOpen")).toEqual(true);
    });

    it("onClose method should be triggered", () => {
        const mockLogoutCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: LogoutProps = {
            onLogout: mockLogoutCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Logout {...props} />)

        wrapper.find("button#close").simulate("click");

        // Check that the callback was called
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockLogoutCallBack.mock.calls.length).toEqual(0);
    });

    it("onLogout method should be triggered", () => {
        const mockLogoutCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: LogoutProps = {
            onLogout: mockLogoutCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Logout {...props} />);

        wrapper.find("button#log_out").simulate("click");

        // Check that the callback was called
        expect(mockLogoutCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });
});