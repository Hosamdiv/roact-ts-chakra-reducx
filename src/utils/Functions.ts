import { toaster } from "../components/ui/toaster";
import { IProducts } from "../interfaces";

export const addItemToShoppingCart = (
  cartProducts: IProducts[],
  cartShopping: IProducts
) => {
  const exists = cartProducts.find((item) => item.id === cartShopping.id);

  if (exists) {
    toaster.create({
      title: "Added To your Cart.",
      description: "This item already exists, the quantity will be increased",
      type: "success",
    });
    console.log("goo hosam");
    return cartProducts.map((item) =>
      item.id === cartShopping.id ? { ...item, qty: +1 } : item
    );
  }
  toaster.create({
    title: "Added To your Cart.",
    type: "success",
  });

  return [...cartProducts, { ...cartShopping, qty: 1 }];
};
