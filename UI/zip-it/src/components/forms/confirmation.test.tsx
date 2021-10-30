import Confirmation, { ConfirmationDetails, ConfirmationProps } from "./confirmation";
import { configure, mount, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

jest.useFakeTimers();

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("Confirmation", () => {
    it("Should render correctly", () => {
        const props: ConfirmationProps = {
            onConfirm: (ldprops: ConfirmationDetails) => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: true,

            disabled: false,
        };

        const component = render(<Confirmation {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Visibility should change", () => {
        const props: ConfirmationProps = {
            onConfirm: (ldprops: ConfirmationDetails) => {
                // Intentional
            },
            onClose: () => {
                // Intentional
            },
            visible: false,
            disabled: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Confirmation {...props} />);

        // Check that it is not visible
        expect(wrapper.find("#confirmation").prop("isOpen")).toEqual(false);

        // Change the component to a visible state
        wrapper.setProps({ visible: true });

        // Check that it is visible
        expect(wrapper.find("#confirmation").prop("isOpen")).toEqual(true);
    });

    it("onClose method should be triggered", () => {
        const mockonConfirmCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: ConfirmationProps = {
            onConfirm: mockonConfirmCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Confirmation {...props} />);

        wrapper.find("ModalCloseButton").simulate("click");

        // Check that the callback was called
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockonConfirmCallBack.mock.calls.length).toEqual(0);
    });

    it("onConfirm method should be triggered", () => {
        const mockonConfirmCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: ConfirmationProps = {
            onConfirm: mockonConfirmCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Confirmation {...props} />);

        // Enter details in the fields
        wrapper.find("Input#confirmationcode").simulate("change", { target: { value: 3000 } });

        // Click the Confirmation button
        wrapper.find("Button#confirm").simulate("click");

        // Check that the callback was called
        expect(mockonConfirmCallBack.mock.calls.length).toEqual(1);

        // Check that none of the other callbacks were called
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onConfirm method should not be triggered - no confirmation details", () => {
        const mockonConfirmCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: ConfirmationProps = {
            onConfirm: mockonConfirmCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Confirmation {...props} />);

        // Click the Confirmation button
        wrapper.find("Button#confirm").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonConfirmCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onConfirm method should not be triggered - invalid confirmation details, too high", () => {
        const mockonConfirmCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: ConfirmationProps = {
            onConfirm: mockonConfirmCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Confirmation {...props} />);

        // Enter details in the fields
        wrapper.find("Input#confirmationcode").simulate("change", { target: { value: 100000 } });

        // Click the Confirmation button
        wrapper.find("Button#confirm").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonConfirmCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

    it("onConfirm method should not be triggered - invalid confirmation details, too low", () => {
        const mockonConfirmCallBack = jest.fn();
        const mockOnCloseCallBack = jest.fn();

        const props: ConfirmationProps = {
            onConfirm: mockonConfirmCallBack,
            onClose: mockOnCloseCallBack,
            visible: true,
            disabled: false,
        };

        // Render the component in a hidden state
        const wrapper = mount(<Confirmation {...props} />);

        // Enter details in the fields
        wrapper.find("Input#confirmationcode").simulate("change", { target: { value: -1 } });

        // Click the Confirmation button
        wrapper.find("Button#confirm").simulate("click");

        // Check that none of the callbacks were called
        expect(mockonConfirmCallBack.mock.calls.length).toEqual(0);
        expect(mockOnCloseCallBack.mock.calls.length).toEqual(0);
    });

});
