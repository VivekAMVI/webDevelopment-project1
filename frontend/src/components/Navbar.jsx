import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import {PlusSquareIcon} from '@chakra-ui/icons'
import {IoMoon } from "react-icons/io5"
import {LuSun} from "react-icons/lu"
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {colorMode,toggleColorMode}=useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
        h={16}
        align={'center'}
        justifyContent={'space-between'}
        flexDir={{
            base:'column',
            sm:'row'
        }}
        >
            <Text
                fontSize={{base:"22",sm:"28"}}
                fontWeight={"bold"}
                textTransform={'uppercase'}
                bgGradient={"linear(to-r,cyan.400,blue.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}>Product store 🛒</Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                <Button>
                    <PlusSquareIcon fontSize={20}/>
                </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "Light" ?<IoMoon />:<LuSun size='20'/>}
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar