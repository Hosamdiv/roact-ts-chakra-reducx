import { SkeletonCircle } from "../ui/skeleton";
import { Flex, Stack, Skeleton } from "@chakra-ui/react";



export const ProductsSkeleton = () => {
  return (
    <Stack padding={"6"} bg="gray.600" rounded={"lg"}>
      <SkeletonCircle size="40" mx={"auto"} />
      <Skeleton mt={4} w={20} height="4" mx={"auto"} />
      <Skeleton mt={4} height="4" />
      <Flex justifyContent={"space-between"}>
        <Skeleton mt={"4"} height="4" width="40%" />
        <Skeleton mt={"4"} height="4" width="40%" />
      </Flex>
      <Skeleton mt={4} w={20} height="4" />
      <Skeleton mt={4} w={20} height="4" />
      <Skeleton mt={4} height="4" />
    </Stack>
  );
};
