import { Input, Select, Stack, Button, Icon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import query from '../../data/queries';
import clientConnection from '../../data/client';

export interface SearchDetails {
  postcode: number;
  type: string;
  category: string;
}

export interface SearchProps {
  onSearchI(props: SearchDetails): void;
}

export function Search(props: SearchProps) {
  //defines Search Type and creates setter
  const [postcode, setPostcode] = useState(0o0);
  const [type, setType] = useState('');
  const [category, setCategory] = useState("");
  

  //on change calls setSearchType
  const postcodeOnChange = (event) => setPostcode(event.target.value);
  const typeOnChange = (event) => setType(event.target.value);
  const categoryOnChange = (event) => setCategory(event.target.value);
  
  const onSearch = () => {
    //sets Search Details
    const searchDetails: SearchDetails = {
      postcode: postcode,
      type: type,
      category: category,
      
    };

    props.onSearchI(searchDetails);
  };

  return (
    <Stack direction={['column']} w={['100%', '300px']}>
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
      <Select placeholder="Category"
        type="category"
        id="category"
        onChange={categoryOnChange}>
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
      <Button leftIcon={<Icon as={FaSearch} />} onClick={onSearch}>
        Search
      </Button>
    </Stack>
  );
}

export default Search;
