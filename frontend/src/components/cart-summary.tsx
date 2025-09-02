"use client"

import type React from "react"

interface CartSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  onCheckout?: () => void
  showCheckoutButton?: boolean
}

export default function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
  showCheckoutButton = true,
}: CartSummaryProps) {
  const summaryRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    fontSize: "1rem",
  }

  const totalRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "2px solid var(--color-border)",
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "var(--color-primary)",
  }

  const checkoutButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
    marginTop: "1.5rem",
  }

  const freeShippingStyle: React.CSSProperties = {
    color: "var(--color-primary)",
    fontWeight: "500",
  }

  return (
    <div>
      <div style={summaryRowStyle}>
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div style={summaryRowStyle}>
        <span>Shipping:</span>
        <span style={shipping === 0 ? freeShippingStyle : {}}>
          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
        </span>
      </div>

      <div style={summaryRowStyle}>
        <span>Tax:</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div style={totalRowStyle}>
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      {shipping === 0 && subtotal > 100 && (
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-primary)",
            marginTop: "0.5rem",
            textAlign: "center",
          }}
        >
          🎉 You qualify for free shipping!
        </p>
      )}

      {showCheckoutButton && onCheckout && (
        <button style={checkoutButtonStyle} onClick={onCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  )
}
