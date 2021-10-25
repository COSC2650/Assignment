import { gql } from "@apollo/client";

//fetches user authentication information
const query = (props) => {
  if (props.userEmail != null) {
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
    //fetches listings according to passed params
    console.log(props)
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
