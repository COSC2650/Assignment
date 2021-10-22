import { gql } from '@apollo/client';

//query users by email and password
const query = (props) => {
  if (props.email != null) {
    console.log('userQuery--------------------------------------');
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
  if (props.postcode > 0) {
    console.log('postcode query -------------------------------------');
    return {
      query: gql`
        {
          ads(postcode: "${props.postcode}") {
            listingID
            title
            description
            imageURL
          }
        }
      `,
    };
  }
  //query by type product or service
  if (props.type === 'product' || props.type === 'service') {
    console.log('type query --------------------------------------');
    return {
      query: gql`
        {
          adsByType(type: "${props.type}") {
            listingID
            title
            description
            imageURL
            type
          }
        }
      `,
    };
  }
  //default query on load
  if (props.type === 'onLoad') {
    console.log('query on load --------------------------------------');
    return {
      query: gql`
        {
          ads {
            listingID
            title
            description
            imageURL
          }
        }
      `,
    };
  } else {
    //called when no query defined for the passed params
    console.log('Query Not Defined in queries.tsx -- Zip-It');
    return {
      query: gql`
        {
          ads {
            listingID
            title
            description
            imageURL
          }
        }
      `,
    };
  }
};
export default query;
