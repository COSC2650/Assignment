import { useContext } from "react";
import { Flex, Heading, Input, Button, Select } from "@chakra-ui/react";
import { AccountContext } from "./accountContext";

//filter component
export function Filter() {
    const { switchToLogin } = useContext(AccountContext);

    return (
        <Flex direction="column" p={12} rounded={6}>
            <Heading textAlign="center" mb={6}>
                Zip-It Filter!
            </Heading>
            <Input placeholder="Zip/Area-code" variant="filled" mb={3} type="zipCode" id="zipCode" />
            <Select placeholder="Category" mb={3}>
                <option value="option1">Gardening</option>
                <option value="option2">Automotive</option>
                <option value="option3">Collectables</option>
                <option value="option1">Gardening</option>
                <option value="option2">Artisan products</option>
                <option value="option3">Trades and Services</option>
                <option value="option1">Consumables</option>
                <option value="option2">Tooling</option>
                <option value="option3">Construction</option>
                <option value="option1">Technology</option>
                <option value="option2">Produce</option>
                <option value="option3">Toys</option>
            </Select>
            <Select placeholder="Condition" mb={3}>
                <option value="option1">Good Condition</option>
                <option value="option2">Well used</option>
                <option value="option3">Barely Used</option>
                <option value="option1">UnUsed</option>
                <option value="option2">Qualified</option>
                <option value="option3">Qualified and Certified</option>
                <option value="option1">Un Qualified and Un Certified</option>
            </Select>
            <Select placeholder="Availibility" mb={3}>
                <option value="option1">Now</option>
                <option value="option2">Then</option>
                <option value="option3">Booked Out</option>
            </Select>
            <Button onClick={switchToLogin} colorScheme="teal" mb={6} id="logout">
                Logout
            </Button>
        </Flex>
    );
}
// }

export default Filter;
