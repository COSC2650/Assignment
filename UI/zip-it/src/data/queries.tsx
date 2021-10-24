import { gql } from "@apollo/client";

//query users by email and password
const query = (props) => {
  if (props.email != null) {
    console.log("userQuery--------------------------------------");
    return {
      query: gql`
    {
      userByEmail(email: "${props.email}", password: "${props.password}") {
        email
        firstName
      }
    }
  `,
    };
  }
  if (props!=null) {
    console.log("query on load --------------------------------------");
    return {
      query: gql`
        {
          listingsByFilter(listingPostcode:${props.postcode},listingType:"${props.listingType}",category:"${props.category}") {
            listingID
            title
            description
            imageURL
            listingType
          }
        }
      `,
    };
  } else {
    //called when no query defined for the passed params
    console.log("Query Not Defined in queries.tsx -- Zip-It");
    console.log(props);
    return {
      query: gql`
        {
          listings {
            listingID
            title
            description
            imageURL
            listingType
          }
        }
      `,
    };
  }
};
export default query;
