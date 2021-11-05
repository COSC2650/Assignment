import { gql } from "@apollo/client";

//fetches user authentication information
const query = (props) => {
  if (props.email != null) {
    return {
      query: gql`
              {
                userByEmail(email: "${props.email}", password: "${props.password}") {
                  userID
                  userEmail
                  userFirstName
                  userEmailVerified
                  userPostCode
                }
              }
            `,
    };
  } else {
    //fetches listings according to passed params
    return {
      query: gql`
              {
                listingsByFilter(listingPostCode:${props.listingPostCode===undefined?0:props.listingPostCode},listingType:"${props.listingType}",listingCategory:"${props.listingCategory}") {
                  listingID
                  listingTitle
                  listingDescription
                  listingImageURL
                  listingType
                  listingPostCode
                  listingPrice
                }
              }
              `,
    };
  }
};
export default query;
