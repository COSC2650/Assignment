import Login, { LoginProps, LoginDetails } from "./login";
import { configure, mount, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("LogIn", () => {
    it("Should render correctly", () => {
        let props: LoginProps = {
            onLogin: (ldprops: LoginDetails) => {
                // Intentional
            },
            onOpenRegister: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        const component = render(<Login {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Visibility should change", () => {
        const props: LoginProps = {
            onLogin: (ldprops: LoginDetails) => {
                // Intentional
            },
            onOpenRegister: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Login {...props} />);

        // Check that it is not visible
        expect(wrapper.find("#login").prop("isOpen")).toEqual(false);

        // Change the component to a visible state
        wrapper.setProps({ visible: true });

        // Check that it is visible
        expect(wrapper.find("#login").prop("isOpen")).toEqual(true);
    });

    it("onClose method should be triggered", () => {
        const mockCloseCallBack = jest.fn();

        const props: LoginProps = {
            onLogin: (ldprops: LoginDetails) => {
                // Intentional
            },
            onOpenRegister: () => {
                // Intentional
            },
            onClose: mockCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Login {...props} />);

        wrapper.find("ModalCloseButton").simulate("click");

        expect(mockCloseCallBack.mock.calls.length).toEqual(1);
    });

    it("onLogin method should be triggered", () => {
        const mockLoginCallBack = jest.fn();

        const props: LoginProps = {
            onLogin: mockLoginCallBack,
            onOpenRegister: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Login {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#login").simulate("click");

        // Check that the callback was called
        expect(mockLoginCallBack.mock.calls.length).toEqual(1);
    });

    it("onLogin method should not be triggered - no login details", () => {
        const mockLoginCallBack = jest.fn();

        const props: LoginProps = {
            onLogin: mockLoginCallBack,
            onOpenRegister: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Login {...props} />);

        // Click the Login button
        wrapper.find("Button#login").simulate("click");

        // Check that the callback was called
        expect(mockLoginCallBack.mock.calls.length).toEqual(0);
    });

    it("onLogin method should not be triggered - invalid email", () => {
        const mockLoginCallBack = jest.fn();

        const props: LoginProps = {
            onLogin: mockLoginCallBack,
            onOpenRegister: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Login {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "ThisIsNotAnEmail" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#login").simulate("click");

        // Check that the callback was called
        expect(mockLoginCallBack.mock.calls.length).toEqual(0);
    });

    it("onLogin method should not be triggered - no email", () => {
        const mockLoginCallBack = jest.fn();

        const props: LoginProps = {
            onLogin: mockLoginCallBack,
            onOpenRegister: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Login {...props} />);

        // Enter details in the fields
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#login").simulate("click");

        // Check that the callback was called
        expect(mockLoginCallBack.mock.calls.length).toEqual(0);
    });

    it("onLogin method should not be triggered - no password", () => {
        const mockLoginCallBack = jest.fn();

        const props: LoginProps = {
            onLogin: mockLoginCallBack,
            onOpenRegister: () => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Login {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });

        // Click the Login button
        wrapper.find("Button#login").simulate("click");

        // Check that the callback was called
        expect(mockLoginCallBack.mock.calls.length).toEqual(0);
    });
});
