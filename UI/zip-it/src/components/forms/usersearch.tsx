import { Input, Select, Stack, Button, Icon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';

//SearchDetails constructor
export interface SearchDetails {
  listingPostCode?: number;
  listingType: string;
  listingCategory: string;
}

//interface to caller
export interface UserSearchProps {
  onSearchInterface(props: SearchDetails): void;
  userPostCode: number;
}

export function Search(props: UserSearchProps) {
  //defines Search Type and creates setter
  let [listingType, setType] = useState('');
  const [listingCategory, setCategory] = useState('');
  const [currentUserPostCode, setCurrentUserPostCode] = useState<number>(3);

  //on change validation and default value set
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

  //dropdown onchange
  const typeOnChange = (event) => setType(event.target.value);
  const categoryOnChange = (event) => setCategory(event.target.value);

  const onSearch = (postcode?: number) => {
    //sets search setails
    const searchDetails: SearchDetails = {
      listingPostCode: postcodeOnChange(postcode),
      listingType: listingType,
      listingCategory: listingCategory,
    };

    // Email regex
    var regexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

    //sets details in interface
    if (!regexp.test('{listingPostCode}')) {
      props.onSearchInterface(searchDetails);
    }
  };

  //used to overcome async state change
  React.useEffect(() => {
    setCurrentUserPostCode(props.userPostCode);
    onSearch(props.userPostCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userPostCode]);

  //search menu component
  return (
    <Stack direction={['column']} w={['100%', '20rem']}>
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
            placeholder="Product Category"
            type="dropdownselect"
            id="productategoryselect"
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
            >
              <option value="">Good Condition</option>
              <option value="">Well used</option>
              <option value="">Barely Used</option>
              <option value="">Unused</option>
            </Select>
            <Select placeholder="Availability" disabled={false}>
              <option value="">Now</option>
              <option value="">Date and Time</option>
              <option value="">Pre Order</option>
            </Select>
          </>
        </>
      )}
      {listingType === 'service' && (
        <>
          <Select
            placeholder="Qualification"
            type="dropdownselect"
            id="qualificationcategoryselect"
            onChange={categoryOnChange}
          >
            <option value="qualandcert">Qualified and Certified</option>
            <option value="qualified">Qualified</option>
            <option value="unqualcert">Unqualified and Uncertified</option>
          </Select>
          <Select
            placeholder="Availability"
            type="dropdownselect"
            id="serviceavailability"
            disabled={false}
          >
            <option value="">Now</option>
            <option value="">Date</option>
          </Select>
        </>
      )}
      {listingType === '' && (
        <>
          <Select
            placeholder="Availability"
            type="dropdownselect"
            id="generalavailability"
          ></Select>
        </>
      )}
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
