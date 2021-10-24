import { Input, Select, Stack, Button, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export interface SearchDetails {
  postcode: number;
  listingType: string;
  category: string;
}

export interface SearchProps {
  onSearchI(props: SearchDetails): void;
}

export function Search(props: SearchProps) {
  //defines Search Type and creates setter
  const [postcode, setPostcode] = useState(0o0);
  const [listingType, setType] = useState("default");
  const [category, setCategory] = useState("default");

  //on change calls setSearchType
  const postcodeOnChange = (event) => setPostcode(event.target.value);
  const typeOnChange = (event) => setType(event.target.value);
  const categoryOnChange = (event) => setCategory(event.target.value);

  const onSearch = () => {
    //sets Search Details
    const searchDetails: SearchDetails = {
      postcode: postcode,
      listingType: listingType,
      category: category,
    };

    props.onSearchI(searchDetails);
  };

  //search criteria logic
  function CategorySelection() {
    if (listingType === "product") {
      return (
        <>
          <Select
            placeholder="Condition"
            type="condition"
            id="condition"
            onChange={categoryOnChange}
          >
            <option value="goodcondition">Good Condition</option>
            <option value="wellused">Well used</option>
            <option value="barelyused">Barely Used</option>
            <option value="unused">Unused</option>
          </Select>
        </>
      );
    }
    if (listingType === "service") {
      return (
        <>
          <Select
            placeholder="Qualification"
            type="qualificaiton"
            id="qualification"
            onChange={categoryOnChange}
          >
            <option value="qualified">Qualified</option>
            <option value="licenced">Qualified and Certified</option>
            <option value="unqualified">Unqualified and Uncertified</option>
          </Select>
        </>
      );
    } else {
      return (
        <>
          <Select
            placeholder="Category"
            type="category"
            id="category"
            onChange={categoryOnChange}
            disabled
          ></Select>
        </>
      );
    }
  }

  return (
    <Stack direction={["column"]} w={["100%", "300px"]}>
      <Input
        placeholder="Post Code"
        variant="filled"
        type="number"
        id="postCode"
        onChange={postcodeOnChange}
      />
      <Select
        placeholder="Products or Services"
        type="type"
        id="type"
        onChange={typeOnChange}
      >
        <option value="product">Product</option>
        <option value="service">Service</option>
      </Select>
      <CategorySelection />
      <Select placeholder="Availibility">
        <option value="option1">Now</option>
        <option value="option2">Then</option>
        <option value="option3">Booked Out</option>
      </Select>
      <Button leftIcon={<Icon as={FaSearch} />} onClick={onSearch}>
        Search
      </Button>
    </Stack>
  );
}

export default Search;
