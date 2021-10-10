import { gql } from '@apollo/client';
const query = (email: String, password: String) => {
  return {
    query: gql`
      {
        userByEmail(email: "{email}", password: "{password}") {
          Email
          FirstName
        }
      }
    `,
  };
};

export default query;