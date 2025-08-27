"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
// import { useRouters } from "react-router"
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouters()
  const navigate = useNavigate();
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - simulate API call
    setTimeout(() => {
      alert("Login successful! (Mock authentication)");
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "var(--color-background)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--color-card)",
    borderRadius: "var(--radius-lg)",
    padding: "3rem",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "var(--color-foreground)",
    marginBottom: "0.5rem",
  };

  const subtitleStyle: React.CSSProperties = {
    color: "var(--color-muted-foreground)",
    fontSize: "1rem",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const inputGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "var(--color-foreground)",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.75rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    backgroundColor: "var(--color-input)",
    transition: "border-color 0.2s ease",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
    border: "none",
    padding: "0.875rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    fontWeight: "600",
    transition: "opacity 0.2s ease",
    opacity: isLoading ? 0.7 : 1,
  };

  const linkSectionStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "2rem",
    paddingTop: "2rem",
    borderTop: "1px solid var(--color-border)",
  };

  const linkStyle: React.CSSProperties = {
    color: "var(--color-primary)",
    textDecoration: "none",
    fontWeight: "500",
  };

  const backLinkStyle: React.CSSProperties = {
    display: "inline-block",
    marginBottom: "2rem",
    color: "var(--color-muted-foreground)",
    textDecoration: "none",
    fontSize: "0.875rem",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <Link to="/" style={backLinkStyle}>
          ← Back to Home
        </Link>

        <div style={headerStyle}>
          <h1 style={titleStyle}>Welcome Back</h1>
          <p style={subtitleStyle}>Sign in to your ShopHub account</p>
        </div>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={linkSectionStyle}>
          <p
            style={{
              color: "var(--color-muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Don't have an account?
          </p>
          <Link to="/register" style={linkStyle}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
