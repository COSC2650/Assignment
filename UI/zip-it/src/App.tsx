import { useState } from "react";
import { Flex, VStack, Box, StackDivider } from "@chakra-ui/layout";
import Header from "./components/elements/header";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import Login from "./components/forms/login";
import Register from "./components/forms/register";

function App() {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const onShowLogin = () => setLoginVisible(true);
    const onShowRegister = () => {
        setLoginVisible(false);
        setRegisterVisible(true);
    };
    const onLogInClose = () => setLoginVisible(false);
    const onRegisterClose = () => setRegisterVisible(false);
    const onLogin = () => {
        alert("Login user here")!;
        setLoginVisible(false);
    };
    const onRegister = () => {
        alert("Register user here")!;
        setRegisterVisible(false);
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" background={formBackground}>
            <Header toggleColorMode={toggleColorMode} toggleLogIn={onShowLogin}></Header>
            <Login visible={loginVisible} onRegister={onShowRegister} onLogin={onLogin} onClose={onLogInClose}></Login>
            <Register visible={registerVisible} onLogin={onShowLogin} onRegister={onRegister} onClose={onRegisterClose}></Register>
            <VStack width="100vw" height="100vh" padding="75px 10px 10px 10px" divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch">
                <Box h="40px" bg="yellow.200">
                    1
                </Box>
                <Box h="40px" bg="tomato">
                    2
                </Box>
                <Box h="40px" bg="pink.100">
                    3
                </Box>
            </VStack>
        </Flex>
    );
}

export default App;
