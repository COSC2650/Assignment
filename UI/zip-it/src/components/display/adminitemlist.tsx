import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem, { ListItemProp } from '../elements/checkboxlistitem';
import query from '../../data/queries';
import AdminSearch, { SearchDetails } from '../forms/adminsearch';
import clientConnection from '../../data/client';
import React, { useState, useEffect } from 'react';

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
          setListings([])
        }
      })
      .catch((result) => {
        console.log('Apollo/GraphQL failure - Zip-It');
        console.log('check relevant query in queries.tsx');
        console.log(props);
        console.log(result);
      });
  };


  
  function ListingsFragment() {    
    console.log(listings);
    return (
      <>
      {userlistings && (
          <>
            {userlistings.map((user: ListItemProp) => (<ListItem key={user.userID} {...user}></ListItem>
            ))}
          </>
        )}
        {listings && (
          <>
            {listings.map((listing: ListItemProp) => (
              <ListItem key={listing.listingID} {...listing}></ListItem>
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
