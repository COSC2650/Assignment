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
  //query by type postcode
  if (props.postcode >= 200 && props.postcode <= 9729) {
    console.log("postcode query -------------------------------------");
    return {
      query: gql`
      {
        listingsByPostcode(listingPostcode:"${props.postcode}"){
          listingID
          postCode
        }
      }
      `,
    };
  }
  //query by type product or service
  if ((props.listingType === "default")&&(props.category==="default")&&(props.postcode===0) ){
    console.log("default query --------------------------------------");
    console.log(props.postcode);
    console.log(props.listingType);
    console.log(props.category);
    return {
      query: gql`
      {
        listingsByType(listingType:"${props.listingType}"){
          listingID
          title
          listingType
        }
      }
    `,
    };
  }

  //query by type product or service
  if (props.listingType !== "default") {
    console.log("type query --------------------------------------");
    console.log(props.listingType);
    return {
      query: gql`
      {
        listingsByType(listingType:"${props.listingType}"){
          listingID
          title
          listingType
        }
      }
    `,
    };
  }
  //query by category
  if (props.category !== "default") {
    console.log("category query --------------------------------------");
    console.log(props.category);
    return {
      query: gql`
      {
        listingsByCategory(category:"${props.category}"){
          listingID
          postCode
          category
        }
      }
    `,
    };
  }
  //default query on load
  if (props.listingType === "onLoad") {
    console.log("query on load --------------------------------------");
    return {
      query: gql`
        {
          listings {
            listingID
            title
            description
            imageURL
          }
        }
      `,
    };
  }
   else {
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
