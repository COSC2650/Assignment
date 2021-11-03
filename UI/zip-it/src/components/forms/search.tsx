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
export interface SearchProps {
  onSearchInterface(props: SearchDetails): void;
  userPostCode: number;
}

export function Search(props: SearchProps) {
  //defines Search Type and creates setter
  const [listingType, setType] = useState('');
  const [listingCategory, setCategory] = useState('');
  const [currentUserPostCode, setCurrentUserPostCode] = useState<number>(3);

  //on change validation and default value set
  function postcodeOnChange(postCodeInput?: number): number | undefined {
    if(postCodeInput === 0){
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
      listingCategory:listingCategory,
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
            placeholder="Product Category"
            type="productcategory"
            id="productategory"
            onChange={categoryOnChange}
          >
            <option value="clothes">Clothes</option>
            <option value="automotive">Automotive</option>
            <option value="industrial">Industrial</option>
            <option value="handcrafted">HandCrafted</option>
          </Select>
        </>
      );
    }
    if (listingType === 'service') {
      return (
        <>
          <Select
            placeholder="Service Category"
            type="servicecagegory"
            id="servicecategory"
            onChange={categoryOnChange}
          >
            <option value="landscaping">Qualified</option>
            <option value="plumbing">Qualified and Certified</option>
            <option value="equipmentrepair">Unqualified and Uncertified</option>
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
        </>
      );
    }
  }
    function QualitySelection() {
      if (listingType === 'product') {
        return (
          <>
            <Select
              placeholder="Condition"
              type="condition"
              id="listingCondition"
            >
              <option value="">Good Condition</option>
              <option value="">Well used</option>
              <option value="">Barely Used</option>
              <option value="">Unused</option>
            </Select>
            <Select placeholder="Availibility" disabled={false}>
              <option value="">Now</option>
              <option value="">Date and Time</option>
              <option value="">Pre Order</option>
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
              <option value="">Qualified</option>
              <option value="">Qualified and Certified</option>
              <option value="">Unqualified and Uncertified</option>
            </Select>
            <Select placeholder="Availibility" disabled={false}>
              <option value="">Now</option>
              <option value="">Date</option>
            </Select>
          </>
        );
      } else {
        return (
          <>
            <Select
              placeholder="Conditions"
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
      <QualitySelection />
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
