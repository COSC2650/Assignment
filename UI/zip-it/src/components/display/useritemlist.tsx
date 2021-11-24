import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem, { ListItemProp } from '../elements/listitem';
import Search, { SearchDetails } from '../forms/usersearch';
import query from '../../data/queries';
import clientConnection from '../../data/client';
import React, { useState } from 'react';

//interfaces
interface userDetails {
  userPostCode: number;
}
export function UserListings(props: userDetails) {
  let [listings, setListings] = useState([]);



  //search query
  const queryAPI = (props: SearchDetails) => {
    
    //invoke client
    const client = clientConnection();
    client
      .query(query(props))
      .then((result) => {
        //create constant from result
        listings = result.data.listingsByFilter;
        setListings(listings);
      })
      //catch apollo/graphQL failure
      .catch((result) => {
        console.log('Apollo/GraphQL failure - Zip-It');
        console.log('check relevant query in queries.tsx');
        console.log(props);
        console.log(result);
      });
  };

  //passes data returned to listItem to be rendered
  function ListingsFragment() {
    return (
      <>
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

  //item list component
  return (
    <>
      <Stack
        direction={['column', 'row']}
        margin="60px 5px 5px 5px"
        divider={<StackDivider />}
        spacing={2}
      >
        <Search
          onSearchInterface={queryAPI}
          userPostCode={props.userPostCode}
        ></Search>
        <VStack divider={<StackDivider />} spacing={2} width="100%">
          <ListingsFragment />
        </VStack>
      </Stack>
    </>
  );
}
export default UserListings;
