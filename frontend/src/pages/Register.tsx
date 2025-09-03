"use client";

import type React from "react";
import { Register } from "@/services/register";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const response = await Register(formData);
    console.log(response);
    router("/login");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-lg rounded-xl bg-card p-8 shadow">
        <Link
          to="/"
          className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
        </Link>
          

        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Join CapstoneStore and start shopping
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) => handleInputChange("fullname", e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Create a password"
              required
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${
                errors.password
                  ? "border-destructive focus:ring-red-400"
                  : "border-border bg-input focus:ring-ring"
              }`}
            />
            {errors.password && (
              <span className="text-xs text-destructive">
                {errors.password}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              placeholder="Confirm your password"
              required
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-destructive focus:ring-red-400"
                  : "border-border bg-input focus:ring-ring"
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-destructive">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="mb-2 text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
