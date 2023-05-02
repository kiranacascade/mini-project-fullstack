import { Box, Flex, Link, Image, InputGroup, InputLeftElement, Input, HStack, Button, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Account } from "./account";
import { useNavigate } from "react-router-dom";
import { FaStore, FaCartPlus } from "react-icons/fa";

export const Navbar = () => {
  const navigate = useNavigate();
  const items = {
    imageURL: "https://www.freepnglogos.com/uploads/logo-tokopedia-png/tokopedia-oralgen-nupearl-advanced-teeth-whitening-system-with-11.png",
  };
  const token = localStorage.getItem("token");

  return (
    <Box pos="sticky" top="0" w="100%" bg="white" zIndex={2} boxShadow={"base"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} p={10}>
        <Link to="/emerce-app/">
          <Image src={items.imageURL} maxH={8} mr={10}></Image>
        </Link>

        <InputGroup maxW={"lg"} mx={"4"}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input type="tel" placeholder="Cari barang disini" />
        </InputGroup>

        <HStack spacing={6}>
          {token ? (
            <>
              <IconButton colorScheme={"green"} variant="outline" aria-label="Open Cart" icon={<FaCartPlus />} />
              <Button leftIcon={<FaStore />} colorScheme={"green"} variant="outline">
                Toko
              </Button>
              <Account />
            </>
          ) : (
            <>
              <Button colorScheme={"green"} variant={"outline"} onClick={() => navigate("/login")}>
                Masuk
              </Button>
              <Button colorScheme={"green"} onClick={() => navigate("/register")}>
                Daftar
              </Button>
              {/* <Login /> */}
              {/* <Register /> */}
            </>
          )}

          {/* {loginButton()}
                    {registerButton()}
                    {cartButton()}
                    {storeButton()}
                    {accountButton()} */}

          {/* <Avatar size={'sm'} src='https://bit.ly/broken-link' /> */}
        </HStack>
      </Flex>
    </Box>
  );
};

// export default Navbar;
