"use client";

import type React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onViewDetails: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "var(--color-card)",
    borderRadius: "var(--radius-lg)",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "var(--radius-md)",
    marginBottom: "1rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "var(--color-card-foreground)",
  };

  const priceStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "var(--color-primary)",
    marginBottom: "1rem",
  };

  const descriptionStyle: React.CSSProperties = {
    color: "var(--color-muted-foreground)",
    marginBottom: "1.5rem",
    lineHeight: "1.5",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
  };

  const addToCartButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
    border: "none",
    padding: "0.75rem 1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    flex: 1,
    fontWeight: "500",
  };

  const viewButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-secondary)",
    color: "var(--color-secondary-foreground)",
    border: "none",
    padding: "0.75rem 1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    flex: 1,
    fontWeight: "500",
  };

  return (
    <div style={cardStyle}>
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        style={imageStyle}
      />
      <h3 style={titleStyle}>{product.name}</h3>
      <p style={priceStyle}>${product.price}</p>
      <p style={descriptionStyle}>{product.description}</p>
      <div style={buttonGroupStyle}>
        <button
          style={addToCartButtonStyle}
          onClick={() => onAddToCart(product.id)}
        >
          Add to Cart
        </button>
        <button style={viewButtonStyle} onClick={onViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
}
