"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Mock registration - simulate API call
    setTimeout(() => {
      alert("Registration successful! (Mock authentication)");
      setIsLoading(false);
      router("/login");
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
    maxWidth: "450px",
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

  const formRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
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

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: "var(--color-destructive)",
  };

  const errorTextStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "var(--color-destructive)",
    marginTop: "0.25rem",
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
          <h1 style={titleStyle}>Create Account</h1>
          <p style={subtitleStyle}>Join ShopHub and start shopping</p>
        </div>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={formRowStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                style={inputStyle}
                placeholder="First name"
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                style={inputStyle}
                placeholder="Last name"
                required
              />
            </div>
          </div>

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
              style={errors.password ? errorInputStyle : inputStyle}
              placeholder="Create a password"
              required
            />
            {errors.password && (
              <span style={errorTextStyle}>{errors.password}</span>
            )}
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              style={errors.confirmPassword ? errorInputStyle : inputStyle}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && (
              <span style={errorTextStyle}>{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={linkSectionStyle}>
          <p
            style={{
              color: "var(--color-muted-foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Already have an account?
          </p>
          <Link to="/login" style={linkStyle}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
