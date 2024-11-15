import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { IProduct } from "../../interfaces";
import { Link } from "react-router-dom";
import { addToCart } from "../../App/features/CartSlice";
import { useAppDispatch } from "../../App/store";

interface IProps {
  product: IProduct;
}

export const ProductsCard = ({ product }: IProps) => {
  const dispatch = useAppDispatch();

  const { description, title, thumbnail, price, id, category } = product;
  const { colorMode } = useColorMode();
  const addToCartHendler = () => dispatch(addToCart(product));

  return (
    <Box
    
      mt={24}
      p={1}
      rounded={"lg"}
      maxW="lg"
      mx={"auto"}
      border={"1px solid #a8b5c8"}
      bg={"none"}
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Image
        rounded="full"
        boxSize="200px"
        margin={5}
        mx="auto"
        objectFit="cover"
        boxShadow="sm"
        _hover={{ boxShadow: "xl" }}
        src={thumbnail}
      />
      <Box textAlign="center" mt={4} flexGrow={1}>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600" mt={2}>
          {description}
        </Text>
        <Text
          color="purple.400"
          fontSize="2xl"
          fontWeight="medium"
          letterSpacing="tight"
          mt="50px"
        >
          {category}
        </Text>
        <Text
          color="purple.600"
          fontSize="2xl"
          fontWeight="medium"
          letterSpacing="tight"
        >
          ${price}
        </Text>
      </Box>
      <Flex mt={20} justifyContent="space-between">
        <Button
          w="49%"
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
          onClick={addToCartHendler}
        >
          add to cart
        </Button>
        <Button
          as={Link}
          to={`/product/${id}`}
          w="49%"
          bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
          color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
          size="xl"
          variant="outline"
          border="none"
          overflow="hidden"
          _hover={{
            bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
            color: colorMode !== "light" ? "purple.600" : "white",
            border: "transparent",
          }}
          textTransform="uppercase"

        >
          Buy now
        </Button>
      </Flex>
    </Box>
  );
};
