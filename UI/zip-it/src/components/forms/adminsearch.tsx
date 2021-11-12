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
  onAdminSearchInterface(props: SearchDetails): void;
  userPostCode: number;
}

export function AdminSearch(props: UserSearchProps) {
  //defines Search Type and creates setter
  let [listingType, setType] = useState('');
  let [listingCategory, setCategory] = useState('');
  let [currentUserPostCode, setCurrentUserPostCode] = useState<number>(3);
  let [adminselection, setAdminSelection] = useState('');

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
  const adminOnChange = (event) => setAdminSelection(event.target.value);

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
      props.onAdminSearchInterface(searchDetails);
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
      <Select
        placeholder="Admin Selection"
        type="dorpdownselect"
        id="adminslection"
        onChange={adminOnChange}
      >
        <option value="users">User</option>
        <option value="listings">Listing</option>
        <option value="tickets">Ticket</option>
      </Select>
      {adminselection === 'listings' && (
        <>
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
        </>
      )}
      {adminselection === 'users' && (
        <>
          <Select
            placeholder="Account Type"
            type="dropdownselect"
            id="qualificationcategoryselect"
            onChange={categoryOnChange}
          >
            <option value="qualandcert">Qualified and Certified</option>
            <option value="qualified">Qualified</option>
            <option value="unqualcert">Unqualified and Uncertified</option>
          </Select>
          <Select
            placeholder="Sort By"
            type="dropdownselect"
            id="serviceavailability"
            disabled={false}
          >
            <option value="">Duration</option>
            <option value="">Category</option>
            <option value="">Date</option>
          </Select>
        </>
      )}
      {adminselection === 'tickets' && <select />}
      {<></>}
      <Input
        placeholder="ID/Email"
        variant="filled"
        type="inputfield"
        id="emailselect"
      />
      <Input
        placeholder="Keyword"
        variant="filled"
        type="inputfield"
        id="keywordselect"
      />
      <Button
        leftIcon={<Icon as={FaSearch} />}
        onClick={() => onSearch(currentUserPostCode)}
      >
        Search
      </Button>
    </Stack>
  );
}

export default AdminSearch;
