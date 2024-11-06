import { Fragment, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { IProduct } from "../interfaces";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";
import { useColorMode } from "../components/ui/color-mode";

const ProductChildren = () => {
  const { id } = useParams<{ id: string }>();

  const { colorMode } = useColorMode();

  const navigate = useNavigate();

  const getProductDetails = async () => {
    const { data } = await axios.get<IProduct>(
      `https://dummyjson.com/products/${id}`
    );

    return data;
  };
  const { isLoading, data } = useQuery(["product", id], getProductDetails);

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (data) {
      document.title = `Product ${data.title} Page`;
    }
  }, [data]);
  if (isLoading) {
    return (
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <ProductDetailsSkeleton />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <Text>Error: Product not found.</Text>
      </Box>
    );
  }

  return (
    <Fragment>
      <Flex
        className="items-center"
        maxW={"sm"}
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>

      <Box
        p={5}
        rounded={"lg"}
        maxW="sm"
        mx={"auto"}
        mb={20}
        border={"1px solid #a8b5c8"}
        bg={"none"}
        overflow="hidden"
      >
        <Image
          src={data.thumbnail}
          alt={data.title}
          objectFit="cover"
          h={"320px"}
          w={"full"}
          rounded={"lg"}
          boxShadow="sm"
          _hover={{ boxShadow: "xl" }}
        />

        <Stack mt={"6"}>
          <Heading size={"md"} textAlign="center">
            {data.title}
          </Heading>
          <Text textAlign={"center"}>{data.description}</Text>
          <Text color="blue.300" textAlign="center" fontSize="2xl">
            ${data.price}
          </Text>
        </Stack>

        <Box mt={10}>
          <Button
            w="full"
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            size="xl"
            variant="outline"
            border="none"
            py={5}
            overflow="hidden"
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode !== "light" ? "purple.600" : "white",
              border: "transparent",
            }}
            textTransform="uppercase"
          >
            add to cart
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ProductChildren;
