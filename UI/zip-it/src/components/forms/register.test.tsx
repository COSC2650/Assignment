import Register, { RegisterProps, RegistrationDetails } from "./register";
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
            
            onRegister: (ldprops: RegistrationDetails) => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,
            disabled:false,
        };

        const component = render(<Register {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Visibility should change", () => {
        const props: RegisterProps = {
            
            onRegister: (ldprops: RegistrationDetails) => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: false,
            disabled:false,
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
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        wrapper.find("ModalCloseButton").simulate("click");

        // Check that the callback was called
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        
    });

    it("onRegister method should be triggered", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that the callback was called
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no registration details", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - invalid email", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "ThisIsNotAnEmail" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no email", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no first name", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - short first name", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#firstName").simulate("change", { target: { value: "1" } });
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - long first name", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#firstName").simulate("change", { target: { value: "012345678901234567890123456789012345678901234567890" } });
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no last name", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
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
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - short last name", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "1" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - long last name", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "012345678901234567890123456789012345678901234567890" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no password", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - short password", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "1" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - long password", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "012345678901234567890123456789012345678901234567890" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no confirmation password", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - short confirmation password", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "1" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - long confirmation password", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "012345678901234567890123456789012345678901234567890" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - mismatched passwords", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw1rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no street", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - short street", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "1" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - long street", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "012345678901234567890123456789012345678901234567890" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 3000 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - no post code", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - three digit postcode", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 999 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onRegister method should not be triggered - five digit postcode", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Enter details in the fields
        wrapper.find("Input#email").simulate("change", { target: { value: "a@valid.email" } });
        wrapper.find("Input#firstName").simulate("change", { target: { value: "First" } });
        wrapper.find("Input#lastName").simulate("change", { target: { value: "Last" } });
        wrapper.find("Input#password").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#passwordConfirm").simulate("change", { target: { value: "AValidPassw0rd" } });
        wrapper.find("Input#street").simulate("change", { target: { value: "Street" } });
        wrapper.find("Input#city").simulate("change", { target: { value: "City" } });
        wrapper.find("Select#state").simulate("change", { target: { value: "VIC" } });
        wrapper.find("Input#postcode").simulate("change", { target: { value: 99999 } });

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the callbacks were called
        
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onOpenRegister method should be triggered", () => {
        
        const mockonRegisterCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: RegisterProps = {
            
            onRegister: mockonRegisterCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled:false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Register {...props} />);

        // Click the Login button
        wrapper.find("Button#register").simulate("click");

        // Check that none of the other callbacks were called
        expect(mockonRegisterCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });
});
