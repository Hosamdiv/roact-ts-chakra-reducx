import { Box, Skeleton } from "@chakra-ui/react";
import { SkeletonText } from "../ui/skeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <Box>
      <Skeleton height={"300px"} />
      <SkeletonText mt={4} noOfLines={1} mx={"auto"} maxW={"200px"} />
      <SkeletonText mt={4}  noOfLines={2} />
      <Skeleton height={"50px"} mx={"auto"} mt={"20px"} w={"50px"} />
     
      <Skeleton
        mt={4}
        height={"50px"}
        padding={"4"}
        maxW={"full"}
        rounded={"lg"}
      />
    </Box>
  );
};
