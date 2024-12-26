import { toaster } from "../components/ui/toaster";
import { IProducts } from "../interfaces";

export const addItemToShoppingCart = (
  cartProducts: IProducts[],
  cartShopping: IProducts
) => {
  // ** exists => increase qty
  const exists = cartProducts.find((item) => item.id === cartShopping.id);
  console.log(exists);
  console.log(cartProducts);
  console.log(cartShopping);

  if (exists) {
    toaster.create({
      title: "Added To your Cart.",
      description: "This item already exists, the quantity will be increased",
      type: "success",
      duration: 1000,
    });
    // ** not exists => add the product
    return cartProducts.map((item) =>
      item.id === cartShopping.id ? { ...item, qty: (item.qty || 0) + 1 } : item
    );
  }
  toaster.create({
    title: "Added To your Cart.",
    type: "success",
    duration: 1000,
  });

  return [...cartProducts, { ...cartShopping, qty: 1 }];
};
