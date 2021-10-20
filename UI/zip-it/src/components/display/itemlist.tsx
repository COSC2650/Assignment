import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem from '../../components/elements/listitem';
import Search, { SearchDetails } from '../forms/search';
import query from '../../data/queries';
import clientConnection from '../../data/client';
import { useState } from 'react';

export function Listings() {
  // let  [title, setTitle] = useState("TITLE");
  // let  [description, setDescription] = useState("TITLE");
  let [adList, setAdList] = useState([]);

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
        const queryResult = result.data;
        if (queryResult != null) {
          //set list of ads
          setAdList(queryResult.ads)
          
        } else {
          console.log('Query Else');
        }
      })
      //catch apollo/graphQL failure
      .catch((result) => {
        console.log('Search Catch');
      });
  };

  return (
    <>
      <Stack
        direction={['column', 'row']}
        margin="60px 5px 5px 5px"
        divider={<StackDivider />}
        spacing={2}
      >{queryAPI(SearchDetails)}
        <Search onSearchI={queryAPI}></Search>
        <VStack divider={<StackDivider />} spacing={2} width="100%">
        {adList && (
        <>
          {adList.map((ad) => (<ListItem
            imageUrl="https://picsum.photos/100?random=1"
            title={"text"}
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          ))}
        </>
      )}
        </VStack>
      </Stack>
    </>
  );
}
export default Listings;
