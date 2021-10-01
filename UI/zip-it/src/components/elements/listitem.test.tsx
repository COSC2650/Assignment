import ListItem, { ListItemProp } from "./listitem"
import { mount, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("ListItem", () => {
    const props: ListItemProp = {
        imageUrl: "https://picsum.photos/100?random=1",
        title: "Test Title",
        description: "Test Description",
        price: 100.00,
        quantity: 10
    }

    it("Should render correctly", () => {
        const component = shallow(<ListItem {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Title should be correct', () => {
        const component = shallow(<ListItem {...props} />);
        
        expect(component
            .find("h1#heading")
            .text()).toEqual(props.title);
        
        expect(component).toMatchSnapshot();
    });
});
