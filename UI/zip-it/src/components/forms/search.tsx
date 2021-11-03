import { Input, Select, Stack, Button, Icon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';

//SearchDetails constructor
export interface SearchDetails {
  listingPostCode?: number;
  listingType: string;
}

//interface to caller
export interface SearchProps {
  onSearchInterface(props: SearchDetails): void;
  userPostCode: number;
}

export function Search(props: SearchProps) {
  //defines Search Type and creates setter
  const [listingType, setType] = useState('');
  
  const [currentUserPostCode, setCurrentUserPostCode] = useState<number>(3);

  //on change validation and default value set
  function postcodeOnChange(postCodeInput?: number): number | undefined {
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
      return 5;
    }
  }

  //dropdown onchange
  const typeOnChange = (event) => setType(event.target.value);
  
  const onSearch = (postcode?: number) => {
    //sets search setails
    const searchDetails: SearchDetails = {
      listingPostCode: postcodeOnChange(postcode),
      listingType: listingType,
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

  //search menu logic
  function CategorySelection() {
    if (listingType === 'product') {
      return (
        <>
          <Select
            placeholder="Condition"
            type="condition"
            id="listingCondition"
          >
            <option value="goodcondition">Good Condition</option>
            <option value="wellused">Well used</option>
            <option value="barelyused">Barely Used</option>
            <option value="unused">Unused</option>
          </Select>
          <Select placeholder="Availibility" disabled={false}>
            <option value="option1">Now</option>
            <option value="option2">Date and Time</option>
            <option value="option3">Pre Order</option>
          </Select>
        </>
      );
    }
    if (listingType === 'service') {
      return (
        <>
          <Select
            placeholder="Qualification"
            type="qualificaiton"
            id="qualification"
          >
            <option value="qualified">Qualified</option>
            <option value="licenced">Qualified and Certified</option>
            <option value="unqualified">Unqualified and Uncertified</option>
          </Select>
          <Select placeholder="Availibility" disabled={false}>
            <option value="option1">Now</option>
            <option value="option2">Date</option>
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
            disabled
          ></Select>
          <Select placeholder="Availibility" disabled></Select>
        </>
      );
    }
  }

  //search menu component
  return (
    <Stack direction={['column']} w={['100%', '300px']}>
      <Input
        placeholder="Post Code"
        variant="filled"
        type="number"
        id="listingPostcode"
        onChange={(event) => {
          setCurrentUserPostCode(parseInt(event.target.value));
          postcodeOnChange(parseInt(event.target.value));
        }}
      />
      <Select
        placeholder="Products or Services"
        type="type"
        id="listingType"
        onChange={typeOnChange}
      >
        <option value="product">Product</option>
        <option value="service">Service</option>
      </Select>
      <CategorySelection />
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
