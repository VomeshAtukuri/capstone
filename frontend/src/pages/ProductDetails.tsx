"use client";

import type React from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router";
import Navigation from "@/components/Navbar";
import { useProducts } from "@/context/products-context";
import { useCart } from "@/context/cart-context";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { getProductById } = useProducts();
  const { addToCart } = useCart();

  const product = getProductById(productId);

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--color-background)",
        }}
      >
        <Navigation />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Product not found</h2>
          <Link to="/products">Back to Products</Link>
        </div>
      </div>
    );
  }

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "var(--color-background)",
  };

  const contentStyle: React.CSSProperties = {
    padding: "2rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const breadcrumbStyle: React.CSSProperties = {
    marginBottom: "2rem",
    color: "var(--color-muted-foreground)",
  };

  const breadcrumbLinkStyle: React.CSSProperties = {
    color: "var(--color-primary)",
    textDecoration: "none",
  };

  const productLayoutStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    alignItems: "start",
  };

  const imageContainerStyle: React.CSSProperties = {
    position: "relative",
  };

  const mainImageStyle: React.CSSProperties = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "var(--radius-lg)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  };

  const productInfoStyle: React.CSSProperties = {
    padding: "1rem 0",
  };

  const categoryBadgeStyle: React.CSSProperties = {
    backgroundColor: "var(--color-muted)",
    color: "var(--color-muted-foreground)",
    padding: "0.25rem 0.75rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.875rem",
    marginBottom: "1rem",
    display: "inline-block",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "var(--color-foreground)",
  };

  const priceStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "var(--color-primary)",
    marginBottom: "1.5rem",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "var(--color-foreground)",
    marginBottom: "2rem",
  };

  const actionButtonsStyle: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
  };

  const addToCartButtonStyle: React.CSSProperties = {
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

  const featuresStyle: React.CSSProperties = {
    backgroundColor: "var(--color-card)",
    padding: "1.5rem",
    borderRadius: "var(--radius-lg)",
    marginTop: "2rem",
  };

  const featuresListStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const featureItemStyle: React.CSSProperties = {
    padding: "0.5rem 0",
    borderBottom: "1px solid var(--color-border)",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const handleAddToCart = () => {
    addToCart(product.id);
    alert("Product added to cart!");
  };

  return (
    <div style={pageStyle}>
      <Navigation />
      <div style={contentStyle}>
        <div style={breadcrumbStyle}>
          <Link to="/" style={breadcrumbLinkStyle}>
            Home
          </Link>
          {" > "}
          <Link to="/products" style={breadcrumbLinkStyle}>
            Products
          </Link>
          {" > "}
          <span>{product.name}</span>
        </div>

        <div style={productLayoutStyle}>
          <div style={imageContainerStyle}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              style={mainImageStyle}
            />
          </div>

          <div style={productInfoStyle}>
            <span style={categoryBadgeStyle}>{product.category}</span>
            <h1 style={titleStyle}>{product.name}</h1>
            <div style={priceStyle}>${product.price}</div>
            <p style={descriptionStyle}>{product.description}</p>

            <div style={actionButtonsStyle}>
              <button style={addToCartButtonStyle} onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Link to="/products" style={backButtonStyle}>
                Back to Products
              </Link>
            </div>

            <div style={featuresStyle}>
              <h3
                style={{
                  marginBottom: "1rem",
                  color: "var(--color-card-foreground)",
                }}
              >
                Product Features
              </h3>
              <ul style={featuresListStyle}>
                <li style={featureItemStyle}>
                  <span>✓</span> High Quality Materials
                </li>
                <li style={featureItemStyle}>
                  <span>✓</span> Fast & Free Shipping
                </li>
                <li style={featureItemStyle}>
                  <span>✓</span> 30-Day Return Policy
                </li>
                <li style={featureItemStyle}>
                  <span>✓</span> 1 Year Warranty
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
