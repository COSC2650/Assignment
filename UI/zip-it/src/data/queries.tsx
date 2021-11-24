import { gql } from '@apollo/client';

//fetches user authentication information
const query = (props) => {
console.log(props)

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
    props.emailIDSelection !== 'emailIDSelection' &&
    props.emailIDSelection !== undefined
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
    props.listingIDSelection !== 0 &&
    props.listingIDSelection !== undefined
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
  }
  if (
    props.listingPostCode >= 0 &&
    props.listingPostCode !== undefined &&
    props.listingPostCode <= 900
  ) {

    return {
      query: gql`
              {
                listingsByFilter(listingPostCode:${
                  props.listingPostCode === undefined
                    ? 0
                    : props.listingPostCode
                },listingKeyword:"${props.listingKeyword}",listingMinPrice:${
        props.listingMinPrice
      },listingMaxPrice:${props.listingMaxPrice}, listingType:"${props.listingType}", listingCategory:"${
        props.listingCategory
      }", listingQuality:"${props.listingQuality}"
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

    // return {
    //   query: gql`
    //           {
    //             listingsByFilter(listingPostCode:${
    //               props.listingPostCode === undefined
    //                 ? 0
    //                 : props.listingPostCode
    //             },listingType:"${props.listingType}",listingCategory:"${
    //     props.listingCategory
    //   }") {
    //               listingID
    //               listingTitle
    //               listingDescription
    //               listingType
    //               listingPostCode
    //               listingPrice
    //               listingAvailability
    //               listingCategory
    //               listingCondition
    //             }
    //           }
    //           `,
    // };
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
      },listingMaxPrice:${props.listingMaxPrice}, listingType:"${props.listingType}", listingCategory:"${
        props.listingCategory
      }", listingQuality:"${props.listingQuality}"
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

    // return {
    //   query: gql`
    //           {
    //             listingsByFilter(listingPostCode:${
    //               props.listingPostCode < 800 ? 0 : props.listingPostCode
    //             },listingType:"${props.listingType}",listingCategory:"${
    //     props.listingCategory
    //   }") {
    //               listingID
    //               listingTitle
    //               listingDescription
    //               listingType
    //               listingPostCode
    //               listingPrice
    //               listingAvailability
    //               listingCategory
    //               listingCondition
    //             }
    //           }
    //           `,
    // };
  }
};
export default query;
