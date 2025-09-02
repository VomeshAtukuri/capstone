import {
  getCartItems,
  addCartItem,
  removeCartItem,
  clearCartItems,
} from "@/services/cart";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartQuantity: (productId: number, quantity: number) => Promise<void>;
  getTotalCartItems: () => number;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token") || "";

  const fetchCart = async () => {
    if (!isAuthenticated || !token) {
      setCart([]); // reset if logged out
      return;
    }
    if (cart.length === 0) {
      setLoading(true);
    }
    try {
      const res = await getCartItems(token);
      setCart(res.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const refreshCart = async () => {
    await fetchCart();
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!isAuthenticated) return;
    await addCartItem(token, productId, quantity);
    await fetchCart();
  };

  const removeFromCart = async (productId: number) => {
    if (!isAuthenticated) return;
    await removeCartItem(token, productId);
    toast.success("Product removed from cart!");
    await fetchCart();
  };

  const updateCartQuantity = async (productId: number, quantity: number) => {
    if (!isAuthenticated) return;
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    await removeFromCart(productId);
    await addToCart(productId, quantity);
    await fetchCart();
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    await clearCartItems(token);
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getTotalCartItems,
        clearCart,
        loading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
