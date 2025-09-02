import axios from "axios";

export async function getCartItems(token: string) {
  const res = await axios.get("http://localhost:5273/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(">>>>>>>>.cart",res);
  return res.data;
}

export async function addCartItem(
  token: string,
  productId: number,
  quantity: number
) {
  const res = await axios.post(
    "http://localhost:5273/api/cart/add",
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function removeCartItem(token: string, productId: number) {
  const res = await axios.post(
    "http://localhost:5273/api/cart/remove",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function clearCartItems(token: string) {
  const res = await axios.post(
    "http://localhost:5273/api/cart/clear",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
