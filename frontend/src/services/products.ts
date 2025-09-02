import axios from "axios";
import { toast } from "sonner";

export interface Product {
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export async function getProducts() {
  const response = await axios.get("http://localhost:5273/api/product");
  console.log(response.data);
  return response.data;
}

export async function getProductbyid(id: number) {
  const response = await axios.get(`http://localhost:5273/api/product/${id}`);
  console.log(response.data);
  return response.data;
}

export async function addProduct(
  productData: Omit<Product, "id">,
  token: string
) {
  const response = await axios.post(
    "http://localhost:5273/api/product",
    productData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  toast.success("Product added successfully!");
  return response.data;
}

export async function updateProduct(
  id: number,
  productData: Omit<Product, "id">,
  token: string
) {
  const response = await axios.put(
    `http://localhost:5273/api/product/${id}`,
    productData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  toast.success("Product updated successfully!");
  return response.data;
}
export async function deleteProduct(id: number, token: string) {
  const response = await axios.delete(
    `http://localhost:5273/api/product/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  toast.success("Product deleted successfully!");
  return response.data;
}
