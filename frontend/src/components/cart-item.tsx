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

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const itemStyle: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
    padding: "1.5rem 0",
    borderBottom: "1px solid var(--color-border)",
  };

  const imageStyle: React.CSSProperties = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "var(--radius-md)",
  };

  const detailsStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const nameStyle: React.CSSProperties = {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "var(--color-card-foreground)",
  };

  const priceStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: "var(--color-primary)",
    fontWeight: "500",
  };

  const quantityControlsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  const quantityButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-muted)",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const quantityInputStyle: React.CSSProperties = {
    width: "60px",
    padding: "0.25rem",
    textAlign: "center",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
  };

  const removeButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-destructive)",
    color: "var(--color-destructive-foreground)",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
  };

  const totalStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  };

  const itemTotalStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "var(--color-primary)",
  };

  return (
    <div style={itemStyle}>
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        style={imageStyle}
      />

      <div style={detailsStyle}>
        <h3 style={nameStyle}>{product.name}</h3>
        <p style={priceStyle}>${product.price} each</p>

        <div style={quantityControlsStyle}>
          <button
            style={quantityButtonStyle}
            onClick={() => onUpdateQuantity(quantity - 1)}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              onUpdateQuantity(Number.parseInt(e.target.value) || 1)
            }
            style={quantityInputStyle}
            min="1"
          />
          <button
            style={quantityButtonStyle}
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <button style={removeButtonStyle} onClick={onRemove}>
          Remove from Cart
        </button>
      </div>

      <div style={totalStyle}>
        <div style={itemTotalStyle}>
          ${(product.price * quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
