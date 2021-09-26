import { Input, Select, Stack, Button, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
    return (
        <Stack direction={["column"]} w={["100%", "300px"]}>
            <Input placeholder="Post Code" variant="filled" type="number" id="postCode" />
            <Select placeholder="Category">
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
            <Select placeholder="Condition">
                <option value="option1">Good Condition</option>
                <option value="option2">Well used</option>
                <option value="option3">Barely Used</option>
                <option value="option1">Unused</option>
                <option value="option2">Qualified</option>
                <option value="option3">Qualified and Certified</option>
                <option value="option1">Unqualified and Uncertified</option>
            </Select>
            <Select placeholder="Availibility">
                <option value="option1">Now</option>
                <option value="option2">Then</option>
                <option value="option3">Booked Out</option>
            </Select>
            <Button leftIcon={<Icon as={FaSearch} />}>Search</Button>
        </Stack>
    );
};

export default Search;
