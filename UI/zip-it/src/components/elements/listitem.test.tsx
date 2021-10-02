import ListItem, { ListItemProp } from "./listitem";
import { configure, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { describe, expect } from "@jest/globals";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useLayoutEffect: jest.requireActual("react").useEffect,
}));

describe("ListItem", () => {
    const props: ListItemProp = {
        imageUrl: "https://picsum.photos/100?random=1",
        title: "Test Title",
        description: "Test Description",
        price: 100.0,
        quantity: 10,
    };

    it("Should render correctly", () => {
        const component = render(<ListItem {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Title should be correct", () => {
        const wrapper = render(<ListItem {...props} />);
        expect(wrapper.find("h1#heading").text()).toEqual(props.title);
    });

    it("Description should be correct", () => {
        const wrapper = render(<ListItem {...props} />);
        expect(wrapper.find("#contents").text()).toEqual(props.description);
    });
}); 