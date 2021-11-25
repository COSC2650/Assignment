import { Input, Select, Stack, Button, Icon } from '@chakra-ui/react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';

//SearchDetails constructor
export interface SearchDetails {
  listingPostCode?: number;
  listingType: string;
  listingCategory: string;
  emailIDSelection?: string;
  listingIDSelection?: number;
}

//interface to caller
export interface SearchPannelProps {
  onAdminSearchInterface(props: SearchDetails): void;
  onAdminDeleteListingsInterface(): void;
}

export function AdminSearch(props: SearchPannelProps) {
  //defines Search Type and creates setter

  let [adminselection, setAdminSelection] = useState('');
  let [emailIDSelection, setUserEmailSelection] = useState('emailIDSelection');
  let [listingIDSelection, setListingIDSelection] = useState(0);
  const emailRegex = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

  

  //clears conflicting search parameters
  const adminOnChange = (event) => setAdminSelection(event.target.value);

  const userEmailOnChange = (event) => {
    setUserEmailSelection(event.target.value);
    setListingIDSelection(0);
  };
  const listingIDOnChange = (event) => {
    if (isNaN(event.target.value) || event.target.value === undefined) {
      setListingIDSelection(0);
      setUserEmailSelection('emailIDSelection');
    } else {
      setListingIDSelection(event.target.value);
      setUserEmailSelection('emailIDSelection');
    }
  };

  //admin search function
  const onSearch = (postcode?: number) => {
    //sets search setails
    const SearchDetails: SearchDetails = {
      listingIDSelection: listingIDSelection,
      emailIDSelection: emailIDSelection,
      listingPostCode: 0,
      listingType: ' ',
      listingCategory: ' ',
    };

    //sets details in interface
    if (
      !emailRegex.test('{listingPostCode}') &&
      !emailRegex.test('{emailSelection}')
    ) {
      props.onAdminSearchInterface(SearchDetails);
    }
  };

  //onMultiDelete
  const onMultiDelete = () => {
    props.onAdminDeleteListingsInterface();
  };

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
      </Select>
      {adminselection === 'users' && (
        <>
          <Input
            placeholder="Email"
            variant="filled"
            type="inputfield"
            id="useremail"
            onChange={userEmailOnChange}
          />
          <Button leftIcon={<Icon as={FaSearch} />} onClick={() => onSearch()}>
            Search
          </Button>
        </>
      )}
      {adminselection === 'listings' && (
        <>
          <Input
            placeholder="Listing ID"
            variant="filled"
            type="inputfield"
            id="listingidadminsearch"
            onChange={listingIDOnChange}
          />
          <Button leftIcon={<Icon as={FaSearch} />} onClick={() => onSearch()}>
            Search
          </Button>
        </>
      )}
      <Button leftIcon={<Icon as={FaTrashAlt} />} onClick={onMultiDelete}>
        Delete Items
      </Button>
      {<></>}
    </Stack>
  );
}

export default AdminSearch;
