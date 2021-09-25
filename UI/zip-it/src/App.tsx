import { useState } from "react";
import { Flex, VStack, StackDivider } from "@chakra-ui/layout";
import Header from "./components/elements/header";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import Login, { LoginDetails } from "./components/forms/login";
import Register, { RestrationDetails } from "./components/forms/register";
import ListItem from "./components/elements/listitem";

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

    const onLogin = (props: LoginDetails) => {
        alert(props.email)!;
        setLoginVisible(false);
    };
    const onRegister = (props: RestrationDetails) => {
        alert(props.email)!;
        setRegisterVisible(false);
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" background={formBackground}>
            <Header toggleColorMode={toggleColorMode} toggleLogIn={onShowLogin}></Header>
            <Login visible={loginVisible} onOpenRegister={onShowRegister} onLogin={onLogin} onClose={onLogInClose}></Login>
            <Register visible={registerVisible} onOpenLogin={onShowLogin} onRegister={onRegister} onClose={onRegisterClose}></Register>
            <VStack width="100vw" height="100vh" padding="75px 10px 10px 10px" divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch">
                <ListItem imageUrl="https://picsum.photos/100?random=1" title="" description="" price={100.0} quantity={10}></ListItem>
                <ListItem imageUrl="https://picsum.photos/100?random=2" title="" description="" price={100.0} quantity={10}></ListItem>
                <ListItem imageUrl="https://picsum.photos/100?random=3" title="" description="" price={100.0} quantity={10}></ListItem>
                <ListItem imageUrl="https://picsum.photos/100?random=4" title="" description="" price={100.0} quantity={10}></ListItem>
                <ListItem imageUrl="https://picsum.photos/100?random=5" title="" description="" price={100.0} quantity={10}></ListItem>
            </VStack>
        </Flex>
    );
}

export default App;
