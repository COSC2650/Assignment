import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem, { ListItemProp } from '../../components/elements/listitem';
import Search, { SearchDetails } from '../forms/search';
import query from '../../data/queries';
import clientConnection from '../../data/client';
import React, { useState, useEffect } from 'react';

export function Listings() {  
  var [listings, setListings] = useState([]);

  //default query parameters
  var SearchDetails = {
    postcode: 0o0,
    type: 'onLoad',
    category: 'onLoad',
  };

  const queryAPI = (props: SearchDetails) => {
    //invoke client
    const client = clientConnection();
    client
      .query(query(props))
      .then((result) => {
        //create constant from result
        listings = result.data.ads;
        setListings(listings);
        console.log(listings)
        
      })
      //catch apollo/graphQL failure
      .catch((result) => {
        console.log('Apollo/GraphQL failure - Zip-It');
        console.log("check relevant query in queries.tsx")
        console.log(props)
        console.log(result)
      });
  };

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
        <Search onSearchI={queryAPI}></Search>
        <VStack divider={<StackDivider />} spacing={2} width="100%">
        <ListingsFragment />
        </VStack>
      </Stack>
    </>
  );
}
export default Listings;
