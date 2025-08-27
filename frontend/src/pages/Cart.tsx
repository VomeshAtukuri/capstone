"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navbar";
import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import { useCart } from "@/context/cart-context";
import { useProducts } from "@/context/products-context";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, getTotalCartItems } =
    useCart();
  const { products } = useProducts();
  const router = useNavigate();

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getShippingCost = () => {
    const subtotal = getCartSubtotal();
    return subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  };

  const getTaxAmount = () => {
    return getCartSubtotal() * 0.08; // 8% tax
  };

  const getCartTotal = () => {
    return getCartSubtotal() + getShippingCost() + getTaxAmount();
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "var(--color-background)",
  };

  const contentStyle: React.CSSProperties = {
    padding: "2rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "var(--color-foreground)",
  };

  const emptyCartStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "4rem 2rem",
    color: "var(--color-muted-foreground)",
  };

  const emptyCartTitleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  };

  const shopButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
  };

  const cartLayoutStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "3rem",
  };

  const cartItemsStyle: React.CSSProperties = {
    backgroundColor: "var(--color-card)",
    borderRadius: "var(--radius-lg)",
    padding: "2rem",
  };

  const cartSummaryStyle: React.CSSProperties = {
    backgroundColor: "var(--color-card)",
    borderRadius: "var(--radius-lg)",
    padding: "2rem",
    height: "fit-content",
    position: "sticky",
    top: "2rem",
  };

  if (cart.length === 0) {
    return (
      <div style={pageStyle}>
        <Navigation />
        <div style={contentStyle}>
          <h1 style={titleStyle}>Shopping Cart</h1>
          <div style={emptyCartStyle}>
            <h2 style={emptyCartTitleStyle}>Your cart is empty</h2>
            <p style={{ marginBottom: "2rem" }}>
              Add some products to get started!
            </p>
            <Link to="/products" style={shopButtonStyle}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Navigation />
      <div style={contentStyle}>
        <h1 style={titleStyle}>Shopping Cart ({getTotalCartItems()} items)</h1>

        <div style={cartLayoutStyle}>
          <div style={cartItemsStyle}>
            <h2
              style={{
                marginBottom: "1.5rem",
                color: "var(--color-card-foreground)",
              }}
            >
              Cart Items
            </h2>
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id);
              if (!product) return null;

              return (
                <CartItem
                  key={item.id}
                  product={product}
                  quantity={item.quantity}
                  onUpdateQuantity={(quantity) =>
                    updateCartQuantity(item.id, quantity)
                  }
                  onRemove={() => removeFromCart(item.id)}
                />
              );
            })}
          </div>

          <div style={cartSummaryStyle}>
            <h2
              style={{
                marginBottom: "1.5rem",
                color: "var(--color-card-foreground)",
              }}
            >
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
