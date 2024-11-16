import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <Stack maxW="85%" mx={"auto"} my={10}>
      {Array.from({ length: 6 }, (_, idx) => (
        <Flex
          key={idx}
          alignItems={"center"}
          justifyContent={"space-between"}
          border={"1px solid #333"}
          h={"30px"}
          rounded={"md"}
          p={2}
        >
          <Skeleton h={"6px"} w={"120px"} bg={"gray"} />
          <Skeleton h={"6px"} w={"120px"} bg={"gray"} />
          <Skeleton h={"6px"} w={"120px"} bg={"gray"} />
          <Flex>
            <Skeleton h={"15px"} w={"50px"} bg={"red.400"} mr={4} />
            <Skeleton h={"15px"} w={"50px"} bg={"blue.300"} />
          </Flex>
        </Flex>
      ))}
      <Box>
        <Skeleton h={"15px"} w={"250px"} bg={"gray"} mx={"auto"} />
      </Box>
    </Stack>
  );
};

export default TableSkeleton;
