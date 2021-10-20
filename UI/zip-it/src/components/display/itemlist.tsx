import { VStack, StackDivider, Stack } from "@chakra-ui/layout";
import ListItem, { ListItemProp } from "../../components/elements/listitem";
import Search, { SearchDetails } from "../forms/search";
import query from "../../data/queries";
import clientConnection from "../../data/client";
import { useState, useEffect } from "react";

export function Listings() {
  // let  [title, setTitle] = useState("TITLE");
  // let  [description, setDescription] = useState("TITLE");
  let [listings, setListings] = useState([]);

  //default query parameters
  var SearchDetails = {
    postcode: 0o0,
    type: "onLoad",
    category: "onLoad",
  };

  const queryAPI = (props: SearchDetails) => {
    //invoke client
    const client = clientConnection();
    client
      .query(query(props))
      .then((result) => {
        //create constant from result
        setListings(result.data.ads);
        if (listings != null) {
          console.log(listings)
          //set list of ads
        } else {
          console.log("Query Else");
        }
      })
      //catch apollo/graphQL failure
      .catch((result) => {
        console.log("Search Catch");
      });
  };
  useEffect(() => {
    queryAPI(SearchDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Stack
        direction={["column", "row"]}
        margin="60px 5px 5px 5px"
        divider={<StackDivider />}
        spacing={2}
      >
        <Search onSearchI={queryAPI}></Search>
        <VStack divider={<StackDivider />} spacing={2} width="100%">
          {listings && (
            <>
              {listings.map((listing: ListItemProp) => (
                <ListItem key={listing.id} {...listing}></ListItem>
              ))}
            </>
          )}
        </VStack>
      </Stack>
    </>
  );
}
export default Listings;
