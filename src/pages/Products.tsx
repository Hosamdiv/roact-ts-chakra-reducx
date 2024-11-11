import { Grid } from "@chakra-ui/react";
import { ProductsCard } from "../components/components/ProductsCard";
import { useQuery } from "react-query";
import { IProduct } from "../interfaces";
import { ProductsSkeleton } from "../components/components/ProductsSkeleton";
import axios from "axios";

const ProductsPage = () => {
  const getProductsList = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products`);
    return data;
  };

  const { isLoading, data } = useQuery("products", () => getProductsList());
  
  if (isLoading)
    return (
      <Grid
        margin={30}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap="6"
      >
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductsSkeleton key={idx} />
        ))}
      </Grid>
    );
  return (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap="6"
    >
      {data.products.map((product: IProduct) => (
        <ProductsCard  key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
