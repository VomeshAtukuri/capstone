"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import CartSummary from "@/components/cart-summary";
import { useCart } from "@/context/cart-context";
import { getProducts } from "@/services/products";
import axios from "axios";
import { toast } from "sonner";

type Product = {
  productId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryName: string;
};

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("token") || "";
  const router = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(Array.isArray(productsData) ? productsData : []);
    };
    fetchProducts();
  }, []);

  const [checkoutForm, setCheckoutForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const getCartSubtotal = () =>
    cart.reduce((total, item) => {
      const product = products.find((p) => p.productId === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

  const getShippingCost = () => (getCartSubtotal() > 100 ? 0 : 9.99);
  const getTaxAmount = () => getCartSubtotal() * 0.08;
  const getCartTotal = () => getCartSubtotal() + getShippingCost() + getTaxAmount();

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addressRes = await axios.post("http://localhost:5273/api/address",
        {
        fullName: `${checkoutForm.firstName} ${checkoutForm.lastName}`.trim(),
        phone: checkoutForm.phone || "0000000000",
        addressLine1: checkoutForm.address,
        addressLine2: "",
        city: checkoutForm.city,
        state: checkoutForm.state,
        zipCode: checkoutForm.zipCode,
        country: checkoutForm.country,
        isDefault: true,
      },{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    });

      const addressId = addressRes.data.addressId;
      console.log("address",addressId);
      const orderRes = await axios.post("http://localhost:5273/api/orders/checkout", {
        addressId,
      },{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },});

      toast.success("Order placed successfully!");

      console.log("Order placed:", orderRes.data);
      clearCart();
      router("/orders");
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error("Checkout failed");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCheckoutForm({ ...checkoutForm, [field]: value });
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

  const checkoutLayoutStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "3rem",
  };

  const formSectionStyle: React.CSSProperties = {
    backgroundColor: "var(--color-card)",
    borderRadius: "var(--radius-lg)",
    padding: "2rem",
  };

  const orderSummaryStyle: React.CSSProperties = {
    backgroundColor: "var(--color-card)",
    borderRadius: "var(--radius-lg)",
    padding: "2rem",
    height: "fit-content",
    position: "sticky",
    top: "2rem",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "2rem",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--color-card-foreground)",
  };

  const formRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.75rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    backgroundColor: "var(--color-input)",
  };

  const fullWidthInputStyle: React.CSSProperties = {
    ...inputStyle,
    width: "100%",
    marginBottom: "1rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
  };

  const backButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-secondary)",
    color: "var(--color-secondary-foreground)",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    fontWeight: "600",
    flex: 1,
  };

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Checkout</h1>

        <div style={checkoutLayoutStyle}>
          <div style={formSectionStyle}>
            <form onSubmit={handleCheckoutSubmit}>
              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Contact Information</h3>
                <input
                  type="email"
                  placeholder="Email address"
                  value={checkoutForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  style={fullWidthInputStyle}
                  required
                />
              </div>

              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Shipping Address</h3>
                <div style={formRowStyle}>
                  <input
                    type="text"
                    placeholder="First name"
                    value={checkoutForm.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    style={inputStyle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={checkoutForm.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    style={inputStyle}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={checkoutForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  style={fullWidthInputStyle}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={checkoutForm.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  style={fullWidthInputStyle}
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={checkoutForm.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  style={fullWidthInputStyle}
                  required
                />
                <div style={formRowStyle}>
                  <input
                    type="text"
                    placeholder="City"
                    value={checkoutForm.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="ZIP code"
                    value={checkoutForm.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    style={inputStyle}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  value={checkoutForm.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  style={fullWidthInputStyle}
                  required
                />
              </div>

              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Payment Information</h3>
                <input
                  type="text"
                  placeholder="Card number"
                  value={checkoutForm.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  style={fullWidthInputStyle}
                  required
                />
                <div style={formRowStyle}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={checkoutForm.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    style={inputStyle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={checkoutForm.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div style={buttonGroupStyle}>
                <Link to="/cart" style={backButtonStyle}>
                  Back to Cart
                </Link>
                <button type="submit" style={submitButtonStyle}>
                  Complete Order
                </button>
              </div>
            </form>
          </div>

          <div style={orderSummaryStyle}>
            <h2
              style={{
                marginBottom: "1.5rem",
                color: "var(--color-card-foreground)",
              }}
            >
              Order Summary
            </h2>
            <div style={{ marginBottom: "1.5rem" }}>
              {cart.map((item) => {
                const product = products.find(
                  (p) => p.productId === item.productId
                );
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span>
                      {product.name} x{item.quantity}
                    </span>
                    <span>₹{(product.price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <CartSummary
              subtotal={getCartSubtotal()}
              shipping={getShippingCost()}
              tax={getTaxAmount()}
              total={getCartTotal()}
              showCheckoutButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
