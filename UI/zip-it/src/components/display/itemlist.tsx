import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem, { ListItemProp } from '../../components/elements/listitem';
import Search, { SearchDetails } from '../forms/search';
import query from '../../data/queries';
import clientConnection from '../../data/client';
import React, { useState, useEffect } from 'react';

export function Listings() {
  // let  [title, setTitle] = useState("TITLE");
  // let  [description, setDescription] = useState("TITLE");
  let [listings, setListings] = useState([]);
  let [listingFragment, setListingFragment] = useState(<ListingsFragment />);

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
        setListings(result.data.ads);
        setListingFragment(ListingsFragment)
      })
      //catch apollo/graphQL failure
      .catch((result) => {
        console.log('Search Catch');
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
          {/* {listingFragment} */}
        </VStack>
      </Stack>
    </>
  );
}
export default Listings;
