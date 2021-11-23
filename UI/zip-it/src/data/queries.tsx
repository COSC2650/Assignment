import { gql } from '@apollo/client';

//fetches user authentication information
const query = (props) => {
  console.log(props);
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
  }
  if (
    (props.listingKeyword !== undefined && props.listingKeyword !== '') ||
    (props.listingMinPrice !== undefined && props.listingMinPrice !== '')||
    (props.listingMaxPrice !== undefined && props.listingMaxPrice !== '')
  ) {
    console.log('new user search');

    //fetches listings according to passed params
    return {
      query: gql`
              {
                listingsByFilter(listingPostCode:${
                  props.listingPostCode < 800 ? 0 : props.listingPostCode
                },listingType:"${props.listingType}",listingCategory:"${
        props.listingCategory
      }") {
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
    //             },listingKeyword:"${props.listingKeyword}",listingPrice:"${
    //     props.listingPrice
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
  if (props.listingType !== undefined && props.listingType === 'service') {
    console.log('service');
    return {
      query: gql`
              {
                serviceByFilter(listingPostCode:${
                  props.listingPostCode < 800 ? 0 : props.listingPostCode
                },listingType:"${props.listingType}",listingCategory:"${
        props.listingCategory
      }") {
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
  if (props.listingType !== undefined && props.listingType === 'product') {
    console.log('product');
    return {
      query: gql`
              {
                productByFilter(listingPostCode:${
                  props.listingPostCode < 800 ? 0 : props.listingPostCode
                },listingType:"${props.listingType}",listingCategory:"${
        props.listingCategory
      }") {
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
  //if user selects posdcode and nothing else
  // if (
  //   props.listingPostCode !== undefined &&
  //   props.listingPostCode >= 0 &&
  //   props.listingPostCode <= 900
  // ) {
  //   console.log('if');

  //   //fetches listings according to passed params
  //   return {
  //     query: gql`
  //             {
  //               listingsByFilter(listingPostCode:${
  //                 props.listingPostCode === undefined
  //                   ? 0
  //                   : props.listingPostCode
  //               },listingType:"${props.listingType}",listingCategory:"${
  //       props.listingCategory
  //     }") {
  //                 listingID
  //                 listingTitle
  //                 listingDescription
  //                 listingType
  //                 listingPostCode
  //                 listingPrice
  //                 listingAvailability
  //                 listingCategory
  //                 listingCondition
  //               }
  //             }
  //             `,
  //   };
  // } 
  else {

    //default if no params are selected and no user logged in
    return {
      query: gql`
              {
                listingsByFilter(listingPostCode:${
                  props.listingPostCode < 800 ? 0 : props.listingPostCode
                },listingType:"${props.listingType}",listingCategory:"${
        props.listingCategory
      }") {
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
