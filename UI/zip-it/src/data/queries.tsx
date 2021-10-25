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
  if (
    props.listingPostcode !== 0 ||
    props.listingType !== "" ||
    props.listingCategory !== ""
  ) {
    console.log("listings query --------------------------------------");
    return {
      query: gql`
        {
          listingsByFilter(listingPostcode:${props.listingPostcode},listingType:"${props.listingType}",category:"${props.listingCategory}") {
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
    console.log("Default query -- Zip-It");
    return {
      query: gql`
      {
        listingsByFilter(listingPostcode:${props.listingPostcode},listingType:"${props.listingType}",category:"${props.listingCategory}") {
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
