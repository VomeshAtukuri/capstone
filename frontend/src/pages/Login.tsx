import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "@/services/login";
import { useAuth } from "@/context/auth-context"; 
import { toast } from "sonner";
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((s) => ({ ...s, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await Login(formData);
      if (response?.token) {
        login(response.token, response.role);
        toast.success("Login successful!");
        navigate("/");
      } else {
        setError("Email or password is wrong");
      }
    } catch {
      setError("Email or password is wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-xl bg-card p-8 shadow">
        <Link
          to="/"
          className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>

        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your ShopHub account
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none ring-ring/0 focus:ring-2 focus:ring-ring"
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
              placeholder="Enter your password"
              required
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none ring-ring/0 focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="mb-2 text-sm text-muted-foreground">
            Don't have an account?
          </p>
          <Link
            to="/register"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
