"use client";

import { useNavigate } from "react-router-dom";
import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "@/services/products";
import Loading from "@/components/Loading";
type Product = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  categoryName: string;
};

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    getTotalCartItems,
    loading,
  } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(Array.isArray(productsData) ? productsData : []);
    };
    fetchProducts();
  }, []);

  if (loading && cart.length === 0) {
    return <Loading message="your carts items.." />;
  }
  const router = useNavigate();
  const getCartSubtotal = () =>
    cart.reduce((total, item) => {
      const product = products.find((p) => p.productId === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

  const getShippingCost = () => (getCartSubtotal() > 100 ? 0 : 9.99);
  const getTaxAmount = () => getCartSubtotal() * 0.08;
  const getCartTotal = () =>
    getCartSubtotal() + getShippingCost() + getTaxAmount();

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="mb-6 text-3xl font-bold text-foreground">
            Shopping Cart
          </h1>
          <div className="rounded-xl bg-card p-10 text-center text-muted-foreground shadow">
            <h2 className="mb-2 text-lg font-semibold">Your cart is empty</h2>
            <p className="mb-6">Add some products to get started!</p>
            <Link
              to="/products"
              className="inline-block rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-foreground">
          Shopping Cart ({getTotalCartItems()} items)
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl bg-card p-6 shadow">
            <h2 className="mb-4 font-semibold text-card-foreground">
              Cart Items
            </h2>
            {cart.map((item) => {
              const product = products.find(
                (p) => p.productId === item.productId
              );
              if (!product) return null;
              return (
                <CartItem
                  key={item.productId}
                  product={product}
                  quantity={item.quantity}
                  onUpdateQuantity={(quantity) =>
                    updateCartQuantity(item.productId, quantity)
                  }
                  onRemove={() => removeFromCart(item.productId)}
                />
              );
            })}
          </div>

          <div className="sticky top-6 h-max rounded-xl bg-card p-6 shadow">
            <h2 className="mb-4 font-semibold text-card-foreground">
              Order Summary
            </h2>
            <CartSummary
              subtotal={getCartSubtotal()}
              shipping={getShippingCost()}
              tax={getTaxAmount()}
              total={getCartTotal()}
              onCheckout={() => router("/checkout")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
