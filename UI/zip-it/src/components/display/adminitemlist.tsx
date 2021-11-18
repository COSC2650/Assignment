import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem, {
  ListItemProp,
  ToggleProps,
} from '../elements/checkboxlistitem';
import query from '../../data/queries';
import AdminSearch, { SearchDetails } from '../forms/adminsearch';
import clientConnection from '../../data/client';
import React, { useState, useEffect } from 'react';
import mutation from '../../data/mutations';

interface userDetails {
  userPostCode: number;
}

export function AdminListings(props: userDetails) {
  let [listings, setListings] = useState([]);
  let [userlistings, setUserListings] = useState([]);

  var SearchDetails = {
    listingPostCode: props.userPostCode,
    listingType: '',
    listingCategory: '',
  };

  const queryAPI = (props: SearchDetails) => {
    const client = clientConnection();
    client
      .query(query(props))
      .then((result) => {
        if (result.data.listingsByFilter) {
          setListings(result.data.listingsByFilter);
          setUserListings([]);
        }
        if (result.data.adminListingSearch) {
          setListings(result.data.adminListingSearch);
          setUserListings([]);
        }
        if (result.data.adminUserSearch) {
          setUserListings(result.data.adminUserSearch);
          setListings([]);
        }
      })
      .catch((result) => {
        console.log('Apollo/GraphQL failure - Zip-It');
        console.log('check relevant query in queries.tsx');
        console.log(props);
        console.log(result);
      });
  };

  //checked item iterator and checked item array
  let checkboxHashmap = new Map([]);

  const DeleteProps = {
      hashmap: Array.from(checkboxHashmap.keys())
    }

  //add and remove ids from hashmap
  const checkboxOnChange = (props: ToggleProps) => {
    if (!props.toggled) {
      checkboxHashmap.delete(props.listingID);
    } else {
      checkboxHashmap.set(props.listingID, props.listingID);
    }
  };

  const mutateAPI = () => {
    console.log('testfire');
    console.log(DeleteProps);

    const client = clientConnection();

    client
      .mutate({ mutation: mutation(DeleteProps) })
      .then((result) => {
        
        console.log(result);
        
      })

      .catch((result) => {
        console.log('Apollo/GraphQL failure - Zip-It');
        console.log('check relevant query in queries.tsx');
        console.log(props);
        console.log(result);
      });
  };

  function ListingsFragment() {
    return (
      <>
        {userlistings && (
          <>
            {userlistings.map((user: ListItemProp) => (
              <ListItem
                key={user.userID}
                {...user}
                checkBoxToggle={checkboxOnChange}
              ></ListItem>
            ))}
          </>
        )}
        {listings && (
          <>
            {listings.map((listing: ListItemProp) => (
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
        <AdminSearch
          onAdminDeleteItemsInterface={mutateAPI}
          onAdminSearchInterface={queryAPI}
          userPostCode={props.userPostCode}
        ></AdminSearch>
        <VStack divider={<StackDivider />} spacing={2} width="100%">
          <ListingsFragment />
        </VStack>
      </Stack>
    </>
  );
}
export default AdminListings;
