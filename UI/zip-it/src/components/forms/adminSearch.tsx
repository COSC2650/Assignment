import { Input, Select, HStack,VStack, Button, Icon } from '@chakra-ui/react';
import { Spacer } from '@chakra-ui/layout';
import { FaCross, FaEdit, FaSearch, FaWindowClose } from 'react-icons/fa';
import React, { useState } from 'react';

export interface SearchDetails {
  listingPostCode?: number;
  listingType: string;
}

export interface AdminSearchProps {
  onAdminSearchInterface(props: SearchDetails): void;
  userPostCode: number;
}

export function AdminSearch(props: AdminSearchProps) {
  const [listingType, setListingType] = useState('');
  const [queryFilterType, setQueryFilterType] = useState('');
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

  const listingTypeOnChange = (event) => setListingType(event.target.value);
  const queryFilterOnChange = (event) => setQueryFilterType(event.target.value);

  const onAdminSearch = (postcode?: number) => {
    const adminSearchDetails: SearchDetails = {
      listingPostCode: postcodeOnChange(postcode),
      listingType: listingType,
    };

    var regexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

    if (!regexp.test('{listingPostCode}')) {
      props.onAdminSearchInterface(adminSearchDetails);
    }
  };

  React.useEffect(() => {
    setCurrentUserPostCode(props.userPostCode);
    onAdminSearch(props.userPostCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userPostCode]);

  function SearchFilterSelection() {
    if (queryFilterType === 'listings') {
      return (
        <>
          <Input
            placeholder="Listing ID"
            variant="filled"
            type="number"
            id="listingID"
          />
          <Input
            placeholder="User ID"
            variant="filled"
            type="number"
            id="userID"
          />
          <Input
            placeholder="Postcode"
            variant="filled"
            type="number"
            id="postcode"
          />
          <Input placeholder="Date" variant="filled" type="number" id="date" />
          <Select
            placeholder="Products or Services"
            type="type"
            id="listingType"
            onChange={listingTypeOnChange}
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
          </Select>
          <CategorySelection />
          <Input
            placeholder="Description"
            variant="filled"
            type="number"
            id="listingID"
          />
          <Input
            placeholder="Price"
            variant="filled"
            type="number"
            id="listingID"
          />
          <Button
            leftIcon={<Icon as={FaSearch} />}
            onClick={() => onAdminSearch(currentUserPostCode)}
          >
            Listing Search
          </Button>
        </>
      );
    }
    if (queryFilterType === 'users') {
      return (
        <>
          <Input
            placeholder="User ID"
            variant="filled"
            type="number"
            id="userID"
          />
          <Input
            placeholder="Name"
            variant="filled"
            type="number"
            id="userID"
          />
          <Input
            placeholder="Address"
            variant="filled"
            type="number"
            id="postcode"
          />
          <Input placeholder="City" variant="filled" type="number" id="date" />
          <Select placeholder="State" type="type" id="listingType">
            <option value="product">ACT</option>
            <option value="service">NSW</option>
          </Select>
          <Input
            placeholder="Postcode"
            variant="filled"
            type="number"
            id="postcode"
          />
          <Input
            placeholder="Email"
            variant="filled"
            type="number"
            id="email"
          />
          <Button
            leftIcon={<Icon as={FaSearch} />}
            onClick={() => onAdminSearch(currentUserPostCode)}
          >
            User Search
          </Button>
        </>
      );
    }  if (queryFilterType === 'tickets') {
      return (
        <>
        <Select
        placeholder="Ticket Type"
        type="type"
        id="ticketType"
      >
        <option value="technicalTicket">Listing Ticket</option>
        <option value="accountTickets">User Ticket</option>

      </Select>
        <Select
        placeholder="Ticket Status"
        type="type"
        id="listingType"
      >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="archived">Archived</option>
      </Select>
          <Input
            placeholder="ID Number"
            variant="filled"
            type="number"
            id="email"
          />
          <Button
            leftIcon={<Icon as={FaSearch} />}
            onClick={() => onAdminSearch(currentUserPostCode)}
          >
            Ticket Search
          </Button>
        </>
      );
    }else{
        return null;
    }
  }

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

  return (
    <VStack>
      <Select
        placeholder="Admin Selection"
        type="type"
        id="listingType"
        onChange={queryFilterOnChange}
      >
        <option value="users">User</option>
        <option value="listings">Listing</option>
        <option value="tickets">Ticket</option>
      </Select>
      <SearchFilterSelection /><HStack >
      <Button
        leftIcon={<Icon as={FaEdit} />}
      >
        Modify
      </Button>
      <Spacer />
      <Button
        leftIcon={<Icon as={FaWindowClose} />}
      >
        Delete
      </Button>
    </HStack>
    </VStack>
  );
}

export default AdminSearch;
