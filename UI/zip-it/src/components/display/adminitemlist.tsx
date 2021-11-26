import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem, {
  ListItemProp,
  ToggleProps,
} from '../elements/checkboxlistitem';
import { useToast } from '@chakra-ui/toast';
import query from '../../data/queries';
import AdminSearch, { SearchDetails } from '../forms/adminsearch';
import clientConnection from '../../data/client';
import React, { useState, useEffect } from 'react';
import mutation from '../../data/mutations';
import Search from '../forms/usersearch';

interface userDetails {
  userPostCode: number;
}

export function AdminListings(props: userDetails) {
  const [itemListings, setItemListings] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const toast = useToast();

  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  //sets default search details
  const SearchDetails = {
    listingPostCode: 0,
    listingKeyword: ' ',
    listingMinPrice: 0,
    listingMaxPrice: 0,
    listingType: ' ',
    listingCategory: ' ',
    listingQuality: ' ',
  };

  //checked item iterator and checked item array
  let itemCheckboxHashmap = new Map([]);
  let userCheckboxHashmap = new Map([]);

  //stores prop in props
  let DeleteProps = {
    itemsHashmap: itemCheckboxHashmap,
    usersHashmap: userCheckboxHashmap,
  };

  //query client
  const queryAPI = (props: SearchDetails) => {
    const client = clientConnection();
    client
      .query(query(props))
      .then((result) => {
        //sets listings hashmaps
        if (result.data.listingsByFilter) {
          setItemListings(result.data.listingsByFilter);
          setUserListings([]);
        }
        if (result.data.adminListingSearch) {
          setItemListings(result.data.adminListingSearch);
          setUserListings([]);
        }
        if (result.data.adminUserSearch) {
          setUserListings(result.data.adminUserSearch);
          setItemListings([]);
        }
      })
      .catch((result) => {
        console.log('Apollo/GraphQL failure - Zip-It');
        console.log('check relevant query in queries.tsx');
        console.log(props);
        console.log(result);
      });
  };

  //add or remove ID from checkedListingsHashmap
  const checkboxOnChange = (props: ToggleProps) => {
    if (!props.toggled) {
      if (!isNaN(props.listingID)) {
        itemCheckboxHashmap.delete(props.listingID);
      }
      if (emailRegex.test(String(props.listingID))) {
        userCheckboxHashmap.delete(props.listingID);
      }
    } else {
      if (!isNaN(props.listingID)) {
        itemCheckboxHashmap.set(props.listingID, props.listingID);
      }
      if (emailRegex.test(String(props.listingID))) {
        userCheckboxHashmap.set(props.listingID, props.listingID);
      }
    }
  };

  //delete multi item client call
  const mutateAPI = () => {
    if (
      (DeleteProps.itemsHashmap.size < 1 &&
        DeleteProps.usersHashmap.size > 0) ||
      (DeleteProps.itemsHashmap.size > 0 && DeleteProps.usersHashmap.size < 1)
    ) {
      const client = clientConnection();
      client
        .mutate({ mutation: mutation(DeleteProps) })
        .then((result) => {
          if (result) {
            toast({
              title: 'Listing Deleted',
              description: 'Selected listings have been deleted',
              status: 'success',
              duration: 2000,
              isClosable: true,
              position: 'top',
            });
            queryAPI(SearchDetails);
          } else {
            toast({
              title: 'Listing Not Deleted',
              description: 'The listing you tried to delete does not exist',
              status: 'warning',
              duration: 2000,
              isClosable: true,
              position: 'top',
            });
          }
        })
        .catch((result) => {
          console.log('Apollo/GraphQL failure - Zip-It');
          console.log('check relevant query in queries.tsx');
          console.log(props);
          console.log(result);
        });
    } else {
      return null;
    }
  };

  function ListingsFragment() {
    if (itemListings.length > 0 || userListings.length > 0) {
      return (
        <>
          {userListings && (
            <>
              {userListings.map((user: ListItemProp) => (
                <ListItem
                  key={user.userID}
                  {...user}
                  checkBoxToggle={checkboxOnChange}
                ></ListItem>
              ))}
            </>
          )}
          {itemListings && (
            <>
              {itemListings.map((listing: ListItemProp) => (
                <ListItem
                  key={listing.listingID}
                  {...listing}
                  checkBoxToggle={checkboxOnChange}
                ></ListItem>
              ))}
            </>
          )}
        </>
      );
    } else {
      return null;
    }
  }

  useEffect(() => {
    queryAPI(SearchDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack
        direction={['column', 'row']}
        margin="60px 5px 5px 5px"
        divider={<StackDivider />}
        spacing={2}
      >
        <VStack>
          <AdminSearch
            onAdminDeleteListingsInterface={mutateAPI}
            onAdminSearchInterface={queryAPI}
          ></AdminSearch>
          <Search
            onSearchInterface={queryAPI}
            userPostCode={props.userPostCode}
          ></Search>
        </VStack>
        <VStack divider={<StackDivider />} spacing={2} width="100%">
          <ListingsFragment />
        </VStack>
      </Stack>
    </>
  );
}
export default AdminListings;
