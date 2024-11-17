import { Image, Table } from "@chakra-ui/react";
import TableSkeleton from "./TableSkeleton";
import { useGetDashboardProductsQuery } from "../../App/services/apiSlice";
import { DashboardProduct } from "../../interfaces";
import { Button } from "../ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";

const DashboardPorudtsTable = () => {
  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  console.log(isLoading);
  console.log(data);
  console.log(error);

  if (isLoading) return <TableSkeleton />;

  return (
    <Table.Root maxW={"85%"} mx={"auto"} my={10} size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Stock</Table.ColumnHeader>
          <Table.ColumnHeader></Table.ColumnHeader>
          <Table.ColumnHeader>Action</Table.ColumnHeader>
          <Table.ColumnHeader></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.products.map((item: DashboardProduct) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>

            <Table.Cell>
              <Image
                rounded={"full"}
                objectFit={"cover"}
                boxSize={"40px"}
                src={item.thumbnail}
                alt={item.title}
              />
            </Table.Cell>
            <Table.Cell textAlign="end">${item.price}</Table.Cell>
            <Table.Cell textAlign="end">{item.stock}</Table.Cell>
            <Table.Cell>
              <Button _hover={{bg:"purple.600"}} bg={"purple.400"} variant={"solid"} ml={3}>
                <AiOutlineEye />
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button _hover={{bg:"red.600"}}  bg={"red.400"} variant={"solid"}>
                <FaRegTrashCan />
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button _hover={{bg:"blue.600"}}  bg={"blue.400"} variant={"solid"}>
                <FaPencilAlt />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default DashboardPorudtsTable;
