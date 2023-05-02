import { Box, VStack, Image } from "@chakra-ui/react";
import { Navbar } from "../components/navbar/navbar";

function Home() {
  const homeComponent = {
    imageURL: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/3/11/52323936-825a-421d-93ff-ca0fb92d04cf.jpg.webp?ect=4g",
  };

  return (
    <>
      <Navbar />
      <Box justifyContent={"center"}>
        <VStack alignItems={"center"} align={"center"} spacing={5} p="30px">
          <Box maxW={"1080px"}>
            <Image src={homeComponent.imageURL} borderRadius={6}></Image>
          </Box>
          {/* <Wrap justify={'center'} spacing='6'>
          {productsCard}
      </Wrap> */}
        </VStack>
      </Box>
    </>
  );
}

export default Home;
