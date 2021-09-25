import { Flex, Spacer } from "@chakra-ui/layout";
import { IconButton, useColorModeValue, Button, Image, Icon } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa"

interface HeaderProps {
    toggleColorMode(): void;
    toggleLogIn(): void;
}

const Filter = (props: HeaderProps) => {
    const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
    const headerBackground = useColorModeValue("gray.700", "gray.100");
    const textColor = useColorModeValue("gray.100", "gray.700");
    const logo = useColorModeValue("/images/logo_white.png", "/images/logo_black.png");

    const toggleColor = () => {
        props.toggleColorMode();
        (document.activeElement as HTMLElement).blur();
    };

    return (
        <Flex align="right" width="100vw" position="fixed" top="0" left="0" zIndex="999" padding="5px" justify="right" background={headerBackground} id="color_mode">
            <Image src={logo} height="45px" align="left" />
            <Spacer />
            <IconButton onClick={toggleColor} borderColor={textColor} marginLeft="5px" borderWidth="1px" color={textColor} backgroundColor={headerBackground} aria-label="Dark mode" size="lg" icon={colorModeIcon} />
            <Button leftIcon={<Icon as={FaUser} />} onClick={props.toggleLogIn} borderColor={textColor} marginLeft="5px" borderWidth="1px" color={textColor} backgroundColor={headerBackground} aria-label="Log in" size="lg">
                Log in
            </Button>
        </Flex>
    );
};

export default Filter;
