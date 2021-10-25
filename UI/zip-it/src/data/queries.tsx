import { gql } from "@apollo/client";

//query users by email and password
const query = (props) => {
  if (props.userEmail != null) {
    console.log("Login Query--------------------------------------");
    return {
      query: gql`
    {
      userByEmail(userEmail: "${props.userEmail}", userPassword: "${props.userPassword}") {
        userEmail
        userFirstName
      }
    }
  `,
    };
  }else {
    //called when no query defined for the passed params
    console.log("Listings query -- Zip-It");
    return {
      query: gql`
      {
        listingsByFilter(listingPostcode:${props.listingPostcode},listingType:"${props.listingType}",listingCategory:"${props.listingCategory}") {
          listingID
          listingTitle
          listingDescription
          listingImageURL
          listingType
        }
      }
      `,
    };
  }
};
export default query;
