import * as React from "react";

import { Flex, Heading, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

const IndexPage = () => {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700");
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Log in to Zip.It</Heading>
                <Input placeholder="your@email.com" variant="filled" mb={3} type="email" id="email" />
                <Input placeholder="********" variant="filled" mb={6} type="password" id="password" />
                <Button colorScheme="teal" mb={6} id="login">
                    Log In
                </Button>
                <Button onClick={toggleColorMode} id="color_mode">Toggle Colour mode</Button>
            </Flex>
        </Flex>
    );
};

function App() {
    return <IndexPage></IndexPage>;
}

export default App;