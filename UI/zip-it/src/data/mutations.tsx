import { gql } from "@apollo/client";

//fetches user authentication information
const mutation = (props) => {
    return {
        mutation: gql`
                mutation {
                    createUser(input: { userFirstName: "${props.userFirstName}", userLastName: "${props.userLastName}", userEmail: "${props.userEmail}", userPassword: "${props.userPassword}", userStreet: "${props.userStreet}", userCity: "${props.userCity}", userState: "${props.userState}", userPostCode: ${props.userPostCode} }) {
                        userID
                    }
                }
            `,
    };
};

export default mutation;
