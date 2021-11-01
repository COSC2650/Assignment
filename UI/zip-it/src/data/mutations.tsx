import { DocumentNode, gql } from "@apollo/client";

//fetches user authentication information
function mutation(props): DocumentNode {
    let result;

    if (props.type === "register") {
        result = gql`
                mutation {
                    createUser(input: { userFirstName: "${props.data.userFirstName}", userLastName: "${props.data.userLastName}", userEmail: "${props.data.userEmail}", userPassword: "${props.data.userPassword}", userStreet: "${props.data.userStreet}", userCity: "${props.data.userCity}", userState: "${props.data.userState}", userPostCode: ${props.data.userPostCode} }) {
                        userID
                        userEmail
                        userFirstName
                        userEmailVerified
                    }
                }
            `;
    } if (props.type === "confirm") {
        result = gql`
                mutation {
                    confirmUser(userEmail: "${props.data.userEmail}", confirmationCode: ${props.data.confirmationCode}) {
                        userID
                        userEmail
                        userFirstName
                        userEmailVerified
                    }
                }
            `;

} else if (props.type === "newlisting") {
    result = gql`
            mutation {
                createListing(input: { listingID: "${props.data.listingID}", listingUserID: ${props.data.listingUserID}, listingPostcode: "${props.data.listingPostcode}", listingTitle: "${props.data.listingTitle}", listingDate: "${props.data.listingDate}", listingPrice: "${props.data.listingPrice}" listingType: "${props.data.listingType}", listingDescription: "${props.data.listingDescription}", listingCondition: "${props.data.listingCondition}", listingAvailability: "${props.data.listingAvailability}", listingImageURL: "${props.data.listingImageURL}",) {
                    listingID
                    listingTitle
                    listingDescription
                    listingImageURL
                    listingType
                    listingPostCode
                }
            }
        `;
}

return result;
}
export default mutation;
