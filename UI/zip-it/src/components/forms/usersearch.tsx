import { Input, Select, Stack, Button, Icon, HStack } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

//interfaces
export interface SearchDetails {
  listingPostCode?: number;
  listingType: string;
  listingCategory: string;
  listingQuality: string;
  listingMinPrice: number;
  listingMaxPrice: number;
  listingKeyword: string;
}
export interface UserSearchProps {
  onSearchInterface(props: SearchDetails): void;
  userPostCode: number;
}


export function Search(props: UserSearchProps) {
  
  //state variables
  const [listingType, setType] = useState('');
  const [listingCategory, setCategory] = useState('');
  const [listingQuality, setQuality] = useState('');
  const [currentUserPostCode, setCurrentUserPostCode] = useState<number>(0);
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  //onchange events
  function postcodeOnChange(postCodeInput?: number): number | undefined {
    if (postCodeInput === 0) {
      return 5;
    }
    if (
      postCodeInput !== undefined &&
      (postCodeInput > 800 || props.userPostCode > 800)
    ) {
      if (
        (isNaN(postCodeInput) || postCodeInput < 800) &&
        props.userPostCode > 800
      ) {
        return props.userPostCode;
      } else {
        return postCodeInput;
      }
    } else {
      return 6;
    }
  }
  const typeOnChange = (event) => setType(event.target.value);
  const categoryOnChange = (event) => setCategory(event.target.value);
  const qualityOnChange = (event) => setQuality(event.target.value);
  const minPriceOnChange = (event) =>
    event.target.value === ''
      ? setMinPrice(0)
      : setMinPrice(event.target.value);
  const maxPriceOnChange = (event) =>
    event.target.value === ''
      ? setMaxPrice(0)
      : setMaxPrice(event.target.value);
  const keywordOnChange = (event) => setKeyword(event.target.value);

  //search function
  const onSearch = (postcode?: number) => {
    
    //Search details constructor
    const searchDetails: SearchDetails = {
      listingPostCode: postcodeOnChange(postcode),
      listingType: listingType,
      listingCategory: listingCategory,
      listingQuality: listingQuality,
      listingMinPrice: minPrice,
      listingMaxPrice: maxPrice,
      listingKeyword: keyword,
    };

    // Email regex
    const regexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

    //sets details in interface
    if (!regexp.test('{listingPostCode}')) {
      props.onSearchInterface(searchDetails);
    }
  };

  //Runs query on load
  useEffect(() => {
    setCurrentUserPostCode(props.userPostCode);
    onSearch(props.userPostCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userPostCode]);

  //search menu component
  return (
    <Stack direction={['column']} w={['100%', '20rem']}>
      <Input
        placeholder="Keyword"
        variant="filled"
        type="inputfield"
        id="keyword"
        onChange={keywordOnChange}
      />
      <Select
        placeholder="Products or Services"
        defaultValue=""
        type="dropdownselect"
        id="listingselect"
        onChange={typeOnChange}
      >
        <option value="product">Product</option>
        <option value="service">Service</option>
      </Select>
      {listingType === 'product' && (
        <>
          <Select
            placeholder="Category"
            type="dropdownselect"
            id="productcategoryselect"
            onChange={categoryOnChange}
          >
            <option value="clothes">Clothes</option>
            <option value="automotive">Automotive</option>
            <option value="industrial">Industrial</option>
            <option value="handcrafted">HandCrafted</option>
          </Select>
          <>
            <Select
              placeholder="Condition"
              type="dropdownselect"
              id="conditionselect"
              onChange={qualityOnChange}
            >
              <option value="good">Good Condition</option>
              <option value="wellused">Well used</option>
              <option value="barelyused">Barely Used</option>
              <option value="unused">Unused</option>
            </Select>
          </>
        </>
      )}
      {listingType === 'service' && (
        <>
          <Select
            placeholder="Category"
            type="dropdownselect"
            id="servicecategoryselect"
            onChange={categoryOnChange}
          >
            <option value="plumbing">Plumbing</option>
            <option value="mechanical">Mechanical</option>
            <option value="carpentry">Carpentry</option>
            <option value="fabrication">Fabrication</option>
          </Select>
          <Select
            placeholder="Qualification"
            type="dropdownselect"
            id="qualificationcategoryselect"
            onChange={qualityOnChange}
          >
            <option value="qualandcert">Qualified and Certified</option>
            <option value="qualified">Qualified</option>
            <option value="unqualcert">Unqualified and Uncertified</option>
          </Select>
        </>
      )}
      <Input
        placeholder="Post Code"
        variant="filled"
        type="inputfield"
        id="postcodeselect"
        onChange={(event) => {
          setCurrentUserPostCode(parseInt(event.target.value));
          postcodeOnChange(parseInt(event.target.value));
        }}
      />
      <HStack spacing={2} width="100%">
        <Input
          placeholder="$MAX"
          variant="filled"
          type="inputfield"
          id="maxprice"
          onChange={maxPriceOnChange}
        />
        <Input
          placeholder="$MIN"
          variant="filled"
          type="inputfield"
          id="minprice"
          onChange={minPriceOnChange}
        />
      </HStack>
      <Button
        leftIcon={<Icon as={FaSearch} />}
        onClick={() => onSearch(currentUserPostCode)}
      >
        Search
      </Button>
    </Stack>
  );
}

export default Search;
