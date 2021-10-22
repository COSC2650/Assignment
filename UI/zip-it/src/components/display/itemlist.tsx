import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem, { ListItemProp } from '../../components/elements/listitem';
import Search from '../forms/search';
import query from '../../data/queries';
import clientConnection from '../../data/client';
import React, { useState, useEffect } from 'react';

export function Listings() {  
  let [listings, setListings] = useState([]);

  //default query parameters
  

  const queryAPI = (props) => {
    //invoke client
    const client = clientConnection();
    client
      .query(query(props))
      .then((result) => {
        //create constant from result
        setListings(result.data.ads);
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
    queryAPI("default");
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
