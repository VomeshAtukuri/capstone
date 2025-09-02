import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { toast } from "sonner";

interface OrderItem {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}
interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
interface Order {
  id: number;
  status: string;
  total: number;
  date: string;
  items: OrderItem[];
  address: Address;
}

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({
  children,
  isAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token") || "";
  const fetchOrders = async () => {
    if (!isAuthenticated || !token) {
      setOrders([]);
      return;
    }
    if (orders.length === 0) {
      setLoading(true);
    }
    try {
      const res = await axios.get("http://localhost:5273/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      console.log("orders", data);

      const mapped: Order[] = data.map((o: any) => ({
        id: o.orderId,
        status: o.status?.toLowerCase() ?? "unknown",
        total: o.totalAmount,
        date:
          typeof o.createdAt === "string"
            ? o.createdAt
            : new Date(o.createdAt).toISOString(),
        items: Array.isArray(o.items)
          ? o.items.map((i: any) => ({
              productId: i.productId,
              name: i.name,
              imageUrl: i.imageUrl,
              price: i.price,
              quantity: i.quantity,
              subtotal: i.subtotal,
            }))
          : [],
        address: {
          fullName: o.address?.fullName,
          phone: o.address?.phone,
          addressLine1: o.address?.addressLine1,
          city: o.address?.city,
          state: o.address?.state,
          zipCode: o.address?.zipCode,
          country: o.address?.country,
        },
      }));

      setOrders(mapped);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };
  
  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await axios.put(`http://localhost:5273/api/orders/${orderId}/status`, {
        status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Order status updated successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, token]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        refreshOrders: fetchOrders,
        updateOrderStatus
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
