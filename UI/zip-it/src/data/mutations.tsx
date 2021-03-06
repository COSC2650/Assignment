import { DocumentNode, gql } from '@apollo/client';

//fetches user authentication information
function mutation(props): DocumentNode {
  let result;

  if (props.type === 'register') {
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
  }

  if (props.type === 'editUserProfile') {
    result = gql`
                mutation {
                    editUser(userID: ${props.data.userID}, input: { userFirstName: "${props.data.userFirstName}", userLastName: "${props.data.userLastName}", userStreet: "${props.data.userStreet}", userCity: "${props.data.userCity}", userState: "${props.data.userState}", userPostCode: ${props.data.userPostCode} }) {
                        userID
                    }
                }
            `;
  }

  if (props.type === 'confirm') {
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
    // matching current input, will be changed in the future
  }

  if (props.type === 'deleteUserProfile') {
    result = gql`
                mutation {
                    deleteUser(userID: ${props.data.userID})
                }
            `;
  }

  if (props.type === 'editListing') {
    result = gql`
                mutation {
                    editListing(listingID: ${props.data.listingID}, input: { listingPostCode: ${props.data.listingPostCode}, listingTitle: "${props.data.listingTitle}", listingCategory: "${props.data.listingCategory}", listingPrice: ${props.data.listingPrice}, listingType: "${props.data.listingType}", listingDescription: "${props.data.listingDescription}", listingCondition: "${props.data.listingCondition}"}) {
                        listingID
                    }
                }
            `;
  }
  if (props.type === 'deleteListing') {
    result = gql`
                mutation {
                    deleteListing(listingID: ${props.data.listingID})
                }
            `;
  }
  if (props.itemsHashmap !== undefined && props.itemsHashmap.size > 0) {
    //create array from hashmap
    let keys = Array.from(props.itemsHashmap.keys());
    result = gql`
            mutation {
                deleteMultiListings(listings:[${keys}]) 
            }
        `;
  }
  if (props.usersHashmap !== undefined && props.usersHashmap.size > 0) {
    //create array from hashmap
    let keys = Array.from(props.usersHashmap.keys());
    result = gql`
              mutation {
                  deleteMultiUsers(users:["${keys}"])
              }
          `;
  }
  if (props.type === 'newListing') {
    result = gql`
            mutation {
                createListing(input: { userID: ${props.data.listingUserID}, listingPostCode: ${props.data.listingPostCode}, 
                listingTitle: "${props.data.listingTitle}", listingCategory: "${props.data.listingCategory}", 
                listingPrice: ${props.data.listingPrice}, listingType: "${props.data.listingType}",  
                listingDescription: "${props.data.listingDescription}", 
                listingCondition: "${props.data.listingCondition}"}) {
                    listingID
                }
            }
        `;
  }
  if (props.type === 'respondListing') {
    result = gql`
            mutation {
                createMessage( listingID: ${props.data.listingID}, senderID: ${props.data.senderID}, messageBody: "${props.data.messageBody}")
            }
        `;
  }

  return result;
}
export default mutation;