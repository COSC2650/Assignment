import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:9002/graphql',
  cache: new InMemoryCache(),
});

function clientConnection() {
  return (
    client
  )
}
export default clientConnection
