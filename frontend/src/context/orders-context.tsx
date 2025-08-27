"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id">) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 299.99,
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 299.99,
          quantity: 1,
          image: "/wireless-headphones.png",
        },
      ],
      shippingAddress: {
        fullName: "John Doe",
        address: "123 Main St",
        city: "New York",
        zipCode: "10001",
      },
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      total: 449.98,
      status: "shipped",
      items: [
        {
          id: 2,
          name: "Smart Watch",
          price: 199.99,
          quantity: 1,
          image: "/smartwatch-lifestyle.png",
        },
        {
          id: 4,
          name: "Running Shoes",
          price: 249.99,
          quantity: 1,
          image: "/running-shoes-on-track.png",
        },
      ],
      shippingAddress: {
        fullName: "John Doe",
        address: "123 Main St",
        city: "New York",
        zipCode: "10001",
      },
    },
  ]);

  const addOrder = (order: Omit<Order, "id">) => {
    const newOrder = {
      ...order,
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
