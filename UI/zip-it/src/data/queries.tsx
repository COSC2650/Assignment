import { gql } from '@apollo/client';

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
                  userLastName
                  userStreet
                  userCity
                  userState
                  userEmailVerified
                  userPostCode
                  roleID
                }
              }
            `,
    };
  }
  //adminUserSearch(id: string, role: number, keyword: string):[User]
  if (
    props.emailIDSelection !== undefined &&
    props.emailIDSelection !== 'emailIDSelection'
  ) {
    return {
      query: gql`
              {
                adminUserSearch(id:"${props.emailIDSelection}",role:0,keyword:"") {
                  userID
                  userEmail
                  userFirstName
                  userLastName
                  userStreet
                  userCity
                  userState
                  userEmailVerified
                  userPostCode
                  roleID
                }
              }
              `,
    };
  }
  if (
    props.listingIDSelection !== undefined &&
    props.listingIDSelection !== 0
  ) {
    return {
      query: gql`
              {
                adminListingSearch(user:"",listingID:${props.listingIDSelection},keyword:"") {
                  listingID
                  listingTitle
                  listingDescription
                  listingType
                  listingPostCode
                  listingPrice
                }
              }
              `,
    };
  } else {
    return {
      query: gql`
              {
                listingsByFilter(listingPostCode:${
                  props.listingPostCode === undefined
                    ? 0
                    : props.listingPostCode
                },listingKeyword:"${props.listingKeyword}",listingMinPrice:${
        props.listingMinPrice
      },listingMaxPrice:${props.listingMaxPrice}, listingType:"${
        props.listingType
      }", listingCategory:"${props.listingCategory}", listingQuality:"${
        props.listingQuality
      }"
      ) {
                  listingID
                  listingTitle
                  listingDescription
                  listingType
                  listingPostCode
                  listingPrice
                  listingAvailability
                  listingCategory
                  listingCondition
                }
              }
              `,
    };
  }
};
export default query;
