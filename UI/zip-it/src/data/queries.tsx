import { gql } from '@apollo/client';

const query = (props) => {
  if (props!= null) {
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
  } if(props.postcode > 0){
    console.log("postcode query -------------------------------------");
    return {
      query: gql`
        {
          ads{
            title
          }
        }
      `,
    }

  }
  if(props.type === "product"){
    console.log("product query --------------------------------------");
    return {
      query: gql`
        {
          ads{
            title
          }
        }
      `,
    }

  }if(props.type === "service"){
    console.log("service query --------------------------------------");
    return {
      query: gql`
        {
          ads{
            title
          }
        }
      `,
    }

  }if(props.type === "onLoad"&&props.category==="onLoad"){
    console.log("query on load --------------------------------------");
    return {
      query: gql`
        {
          ads{
            title
          }
        }
      `,
    }

  }else {
    console.log('Query Undefined -- Zip-It---------------------------');
    return {
      query: gql`
        {
          ads{
            title
          }
        }
      `,
    };
  }
};
export default query;
