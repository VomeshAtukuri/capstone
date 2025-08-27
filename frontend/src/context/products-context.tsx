"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/wireless-headphones.png",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/smartwatch-lifestyle.png",
    description: "Feature-rich smartwatch with health tracking",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 79.99,
    image: "/modern-coffee-maker.png",
    description: "Automatic drip coffee maker with programmable timer",
    category: "Home",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 129.99,
    image: "/running-shoes-on-track.png",
    description: "Comfortable running shoes with advanced cushioning",
    category: "Sports",
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 49.99,
    image: "/laptop-backpack.png",
    description: "Durable laptop backpack with multiple compartments",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/bluetooth-speaker.png",
    description: "Portable Bluetooth speaker with excellent sound quality",
    category: "Electronics",
  },
];

interface Product {
  stock: number;
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, "id">) => void;
  updateProduct: (productId: number, productData: Omit<Product, "id">) => void;
  deleteProduct: (productId: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      ...productData,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (
    productId: number,
    productData: Omit<Product, "id">
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...productData } : p))
    );
  };

  const deleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const getProductById = (id: number) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
