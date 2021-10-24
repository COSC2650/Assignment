import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://api.zipitconline.com/graphql",
  cache: new InMemoryCache(),
});

function clientConnection() {
  return client;
}
export default clientConnection;
