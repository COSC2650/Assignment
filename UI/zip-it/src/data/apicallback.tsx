import query from "./queries";
import clientConnection from "./client";
import { useState } from "react";



export function Callback (props) {

    const [listings, setListings] = useState();

    //invoke client
    const client = clientConnection();
    client
        .query(query(props))
        .then((result) => {
            //create constant from result
            const queryResult = result.data;
            if (queryResult != null) {
                //set list of ads
                setListings(queryResult.listings);
                console.log(queryResult.listings);
            } else {
                console.log("Query Else");
            }
        })
        //catch apollo/graphQL failure
        .catch((result) => {
            console.log("Search Catch");
        });

        return{
            listings
        }


    }
export default Callback;