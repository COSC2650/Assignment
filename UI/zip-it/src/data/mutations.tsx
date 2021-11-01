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

} else if (props.type === "newListing") {
    result = gql`
            mutation {
                createListing(input: { UserID: ${props.data.listingUserID}, ListingPostCode: "${props.data.listingPostcode}", ListingTitle: "${props.data.listingTitle}", ListingDate: "${props.data.listingDate}", listingPrice: "${props.data.listingPrice}" ListingType: "${props.data.listingType}", ListingDescription: "${props.data.listingDescription}", ListingCondition: "${props.data.listingCondition}", ListingAvailability: "${props.data.listingAvailability}", ListingImageURL: "${props.data.listingImageURL}",}) {
                    listingID
                }
            }
        `;
}

return result;
}
export default mutation;
