import { VStack, StackDivider, Stack } from '@chakra-ui/layout';
import ListItem from '../../components/elements/listitem';
import Search, { SearchDetails } from '../forms/search';
import query from '../../data/queries';
import clientConnection from '../../data/client';
import { useState } from 'react';

export function Listings() {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('DefaultTitle');
  const [title3, setTitle3] = useState('DefaultTitle');
  const [title4, setTitle4] = useState('DefaultTitle');
  const [title5, setTitle5] = useState("");

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
        const queryResult = result.data.ads;
        if (queryResult != null) {
          console.log(queryResult[0].title);
          setTitle1(queryResult[0].title);
          console.log(queryResult[1].title);
          setTitle2(queryResult[1].title);
          console.log(queryResult[2].title);
          setTitle3(queryResult[2].title);
          console.log(queryResult[3].title);
          setTitle4(queryResult[3].title);
          console.log(queryResult[4].title);
          setTitle5(queryResult[4].title);
          // const resultCount = queryResult.length;

          // for(var i = 0; i < resultCount; i++){

          //     console.log("result count is " + i)
          //     console.log(queryResult[i].title)
          // }
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
          <ListItem
            imageUrl="https://picsum.photos/100?random=1"
            title={title1}
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=2"
            title={title2}
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=3"
            title={title3}
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=4"
            title={title4}
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
          <ListItem
            imageUrl="https://picsum.photos/100?random=5"
            title={title5}
            description="Description"
            price={100.0}
            quantity={10}
          ></ListItem>
        </VStack>
      </Stack>
    </>
  );
}
export default Listings;
