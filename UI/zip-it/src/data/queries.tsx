import { gql } from "@apollo/client";

//fetches user authentication information
const query = (props) => {
  if (props.email != null) {
    console.log(props)
    return {
      query: gql`
    {
      userByEmail(email: "${props.email}", password: "${props.password}") {
        userEmail
        userFirstName
      }
    }
  `,
    };
  } else {
    //fetches listings according to passed params
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
