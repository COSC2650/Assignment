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
          ads {
            listingID
            title
            description
            imageURL
            postCode
            
          }
        }
      `,
    };
  }
  //query by type product or service
  if (props.listingType === 'product' || props.listingType === 'service') {
    console.log('type query --------------------------------------');
    console.log(props.listingType)
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
  //default query on load
  if (props.listingType === 'onLoad') {
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
    console.log(props);
    return {
      query: gql`
        {
          ads {
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
