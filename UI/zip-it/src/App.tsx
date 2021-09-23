import * as React from "react";

import { Flex, Heading, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const IndexPage = () => {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const client = new ApolloClient({
        uri: "http://api.zipitonline.com/graphql",
        cache: new InMemoryCache(),
    });
    const callGraphQL = () =>
        client
            .query({
                query: gql`
                    query {
                        book {
                            title
                            author {
                                name
                            }
                        }
                    }
                `,
            })
            .then((result) => console.log(result));
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Log in to Zip.It</Heading>
                <Input placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
                <Input placeholder="********" variant="filled" mb={6} type="password" id="password" />
                <Button colorScheme="teal" mb={6} id="login">
                    Log In
                </Button>
                <Button onClick={toggleColorMode} mb={6} id="color_mode">
                    Toggle Colour mode
                </Button>
                <Button onClick={callGraphQL} id="call_gql">
                    Call GraphQL (goes to log)
                </Button>
            </Flex>
        </Flex>
    );
};

function App() {
    return <IndexPage></IndexPage>;
}

export default App;
