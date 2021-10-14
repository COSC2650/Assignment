import { gql } from "@apollo/client";
const query = (email: string, password: string) => {
    return {
        query: gql`
      {
        userByEmail(email: "${email}", password: "${password}") {
          email
          firstName
        }
      }
    `,
    };
};

export default query;
