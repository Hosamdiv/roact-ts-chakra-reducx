import { Flex, Image, Input, Table, Textarea } from "@chakra-ui/react";
import TableSkeleton from "./TableSkeleton";
import {
  useCreateDashboardProductsMutation,
  useDeleteDashboardProductsMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../../App/services/ProductsApiSlice";
import { DashboardProduct } from "../../interfaces";
import { Button } from "../ui/button";
import { AiOutlineEye } from "react-icons/ai";

import AlertDialog from "../../shared/AlertDialog";
import { Link } from "react-router-dom";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaPencilAlt } from "react-icons/fa";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectNetwork } from "../../App/features/NetworkMode";

const DashboardProductsTable = () => {
  const isOnline = useSelector(selectNetwork);

  const { isLoading, data } = useGetDashboardProductsQuery({ page: 0 });
  const [destroyProducts, { isLoading: LoadingAlert, isSuccess }] =
    useDeleteDashboardProductsMutation();

  const [updateProducts, { isLoading: isUpdate, isSuccess: SuccessModale }] =
    useUpdateDashboardProductsMutation();
  const [createProducts, { isLoading: loadingCreate }] =
    useCreateDashboardProductsMutation();
  const [createData, setCreateData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    thumbnail: null,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<DashboardProduct | null>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [clickProductId, setClickProductId] = useState<number | null>(null);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    if (product) {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };
  const onChangeHandlerPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (product) {
      setProduct({
        ...product,
        price: +value,
      });
    }
  };
  const onChangeHandlerStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (product) {
      setProduct({
        ...product,
        stock: +value,
      });
    }
  };
  const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setThumbnail(file);
  };
  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: product?.title,
        description: product?.description,
        price: product?.price,
        stock: product?.stock,
      })
    );
    updateProducts({ id: clickProductId, body: formData });
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    } else {
      console.warn("No thumbnail selected");
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (
      type === "file" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const files = e.target.files;
      setCreateData({ ...createData, [name]: files[0] });
    } else {
      setCreateData({ ...createData, [name]: value });
    }
  };

  const handleSubmit = () => {
    try {
      const newProduct = {
        title: createData.title,
        description: createData.description,
        price: Number(createData.price),
        stock: Number(createData.stock),
        thumbnail: createData.thumbnail,
      };
      createProducts({ body: newProduct });
      setCreateData({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        thumbnail: null,
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  useEffect(() => {
    if (SuccessModale) {
      setClickProductId(null);
      setIsOpen(false);
    }
  }, [SuccessModale, setIsOpen]);

  if (isLoading || !isOnline) return <TableSkeleton />;

  return (
    <>
      <Flex direction={"column"} maxW={"95%"} mx={"auto"} my={6}>
        <DialogRoot placement={"center"}>
          <DialogTrigger asChild>
            <Button bg={"green.400"} _hover={{ bg: "green.600" }} ml={"auto"}>
              Create Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
            </DialogHeader>
            <DialogBody spaceY={2}>
              <DialogTitle>Title</DialogTitle>
              <Input
                name="title"
                placeholder="Product Title"
                value={createData.title}
                onChange={handleChange}
              />
              <DialogTitle>Description</DialogTitle>
              <Textarea
                name="description"
                placeholder="Product description"
                value={createData.description}
                onChange={handleChange}
              />
              <DialogTitle>Price</DialogTitle>
              <NumberInputRoot width="full">
                <NumberInputField
                  name="price"
                  defaultValue={createData.price}
                  onChange={handleChange}
                />
              </NumberInputRoot>
              <DialogTitle>Stock</DialogTitle>
              <NumberInputRoot width="full">
                <NumberInputField
                  name="stock"
                  defaultValue={createData.stock}
                  onChange={handleChange}
                />
              </NumberInputRoot>
              <DialogTitle>Thumbnail</DialogTitle>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                h={"full"}
                p={2}
                accept="image/png, image/gif, image/jpeg"
                onChange={handleChange}
              />
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <DialogTrigger asChild>
                <Button
                  bg={"green.400"}
                  _hover={{ bg: "green.600" }}
                  loading={loadingCreate}
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </DialogTrigger>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
        <Table.Root maxW={"95%"} mx={"auto"} my={5} size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Stock</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
              <Table.ColumnHeader>Action</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.products.map((item: DashboardProduct, idx) => (
              <Table.Row key={idx}>
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
                <Table.Cell>${item.price}</Table.Cell>
                <Table.Cell>{item.stock}</Table.Cell>

                <Table.Cell>
                  <Button
                    _hover={{ bg: "purple.600" }}
                    bg={"purple.400"}
                    variant={"solid"}
                  >
                    <Link to={`/product/${item.id}`}>
                      <AiOutlineEye />
                    </Link>
                  </Button>
                </Table.Cell>

                <Table.Cell>
                  <AlertDialog
                    isSuccess={isSuccess}
                    isLoading={LoadingAlert}
                    onConfirm={async () => {
                      try {
                        await destroyProducts(item.id).unwrap();

                        console.log(`${item.title} true deleted successfully!`);
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    title={`Are you sure you want to delete "${item.title}"?`}
                  />
                </Table.Cell>

                <Table.Cell>
                  <DialogRoot
                    open={isOpen}
                    onOpenChange={() => setIsOpen}
                    placement={"center"}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setClickProductId(item.id);
                          setProduct(item);
                          setIsOpen(true);
                        }}
                        _hover={{ bg: "blue.600" }}
                        bg={"blue.400"}
                        variant={"solid"}
                      >
                        <FaPencilAlt />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                      </DialogHeader>
                      <DialogBody spaceY={2}>
                        <DialogTitle>title</DialogTitle>
                        <Input
                          name="title"
                          placeholder="Product Title"
                          value={product?.title}
                          onChange={onChangeHandler}
                        />
                        <DialogTitle>Description</DialogTitle>
                        <Textarea
                          size="xl"
                          name="description"
                          placeholder="Product description"
                          value={product?.description}
                          onChange={onChangeHandler}
                        />
                        <DialogTitle>Price</DialogTitle>
                        <NumberInputRoot width="full">
                          <NumberInputField
                            name="price"
                            defaultValue={product?.price}
                            onChange={onChangeHandlerPrice}
                          />
                        </NumberInputRoot>
                        <DialogTitle>Stock</DialogTitle>
                        <NumberInputRoot width="full">
                          <NumberInputField
                            name="stock"
                            defaultValue={product?.stock}
                            onChange={onChangeHandlerStock}
                          />
                        </NumberInputRoot>
                        <DialogTitle>Thumbnail</DialogTitle>

                        <Input
                          id="thumbnail"
                          type="file"
                          h={"full"}
                          p={2}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={onChangeThumbnailHandler}
                        />
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                          >
                            Cancel
                          </Button>
                        </DialogActionTrigger>
                        <Button
                          bg={"green.400"}
                          _hover={{ bg: "green.600" }}
                          onClick={onSubmitHandler}
                          loading={isUpdate}
                        >
                          Update
                        </Button>
                      </DialogFooter>
                      <DialogCloseTrigger onClick={() => setIsOpen(false)} />
                    </DialogContent>
                  </DialogRoot>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </>
  );
};

export default DashboardProductsTable;
