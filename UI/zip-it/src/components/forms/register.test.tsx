import Register, { RegisterProps, RestrationDetails } from "./register";
import { configure, mount, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("Register", () => {
    it("Should render correctly", () => {
        let props: RegisterProps = {
            onOpenLogin: () => {
                // Intentional
            },
            onRegister: (ldprops: RestrationDetails) => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
        };

        const component = render(<Register {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Visibility should change", () => {
        const props: RegisterProps = {
            onOpenLogin: () => {
                // Intentional
            },
            onRegister: (ldprops: RestrationDetails) => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Check that it is not visible
        expect(wrapper.find("#register").prop("isOpen")).toEqual(false);

        // Change the component to a visible state
        wrapper.setProps({ visible: true });

        // Check that it is visible
        expect(wrapper.find("#register").prop("isOpen")).toEqual(true);
    });

    it("onClose method should be triggered", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        wrapper.find("ModalCloseButton").simulate("click");

        // Check that the callback was called
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should be triggered", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that the callback was called
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no registration details", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - invalid email", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "ThisIsNotAnEmail" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no email", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no first name", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no last name", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no password", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no confirmation password", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - mismatched passwords", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw1rd" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(0);
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onOpenRegister method should be triggered", () => {
        const mockonOpenLoginCallBack = jest.fn();
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            onOpenLogin: mockonOpenLoginCallBack,
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Click the Login button
        wrapper.find("Button#login").simulate("click");

        // Check that the onRegisterCallBack is called
        expect(mockonOpenLoginCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });
});
