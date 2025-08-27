"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "@/context/cart-context";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useCart();

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "products", label: "Products", href: "/products" },
    { id: "orders", label: "Orders", href: "/orders" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const navStyle: React.CSSProperties = {
    backgroundColor: "var(--color-background)",
    borderBottom: "1px solid var(--color-border)",
    padding: "1rem 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "var(--color-primary)",
    textDecoration: "none",
  };

  const navListStyle: React.CSSProperties = {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "2rem",
  };

  const navItemStyle: React.CSSProperties = {
    color: "var(--color-foreground)",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-md)",
    transition: "all 0.2s ease",
  };

  const rightSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const authLinksStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const authLinkStyle: React.CSSProperties = {
    color: "var(--color-foreground)",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-md)",
    fontSize: "0.875rem",
    fontWeight: "500",
  };
  const cartBadgeStyle: React.CSSProperties = {
    backgroundColor: "var(--color-destructive)",
    color: "var(--color-destructive-foreground)",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    position: "absolute",
    top: "-8px",
    right: "-8px",
  };
  const loginButtonStyle: React.CSSProperties = {
    ...authLinkStyle,
    backgroundColor: "var(--color-secondary)",
    color: "var(--color-secondary-foreground)",
  };

  const registerButtonStyle: React.CSSProperties = {
    ...authLinkStyle,
    backgroundColor: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
  };

  const cartButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-accent)",
    color: "var(--color-accent-foreground)",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
  };

  const adminButtonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-secondary)",
    color: "var(--color-secondary-foreground)",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          ShopHub
        </Link>

        <ul style={navListStyle}>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link to={item.href} style={navItemStyle}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={rightSectionStyle}>
          <div style={authLinksStyle}>
            <Link to="/login" style={loginButtonStyle}>
              Login
            </Link>
            <Link to="/register" style={registerButtonStyle}>
              Register
            </Link>
          </div>

          <Link to="/cart" style={cartButtonStyle}>
            🛒 Cart
            {getTotalCartItems() > 0 && (
              <span style={cartBadgeStyle}>{getTotalCartItems()}</span>
            )}
          </Link>

          <Link to="/admin/dashboard" style={adminButtonStyle}>
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
