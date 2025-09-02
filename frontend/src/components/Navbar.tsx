import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
export default function Navigation() {
  const { isAuthenticated, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { getTotalCartItems } = isAuthenticated
    ? useCart()
    : { getTotalCartItems: () => 0 };

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!");
    navigate("/login");
  };

  const baseLink = "rounded-md px-3 py-2 text-sm font-medium";
  const activeLink = "text-blue-600 shadow-sm";
  const inactiveLink = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  const isActive = (href: string): boolean => {
    return href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-gray-900"
        >
          <span>ShopHub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className={[
              baseLink,
              isActive("/") ? activeLink : inactiveLink,
            ].join(" ")}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={[
              baseLink,
              isActive("/products") ? activeLink : inactiveLink,
            ].join(" ")}
          >
            Products
          </Link>

          {isAuthenticated && (
            <Link
              to="/orders"
              className={[
                baseLink,
                isActive("/orders") ? activeLink : inactiveLink,
              ].join(" ")}
            >
              Orders
            </Link>
          )}

          {role !== "Admin" && (
            <>
              <Link
                to="/about-us"
                className={[
                  baseLink,
                  isActive("/about-us") ? activeLink : inactiveLink,
                ].join(" ")}
              >
                About
              </Link>
              <Link
                to="/contact-us"
                className={[
                  baseLink,
                  isActive("/contact-us") ? activeLink : inactiveLink,
                ].join(" ")}
              >
                Contact
              </Link>
            </>
          )}

          {role === "Admin" && (
            <Link
              to="/admin/dashboard"
              className={[
                baseLink,
                isActive("/admin/dashboard") ? activeLink : inactiveLink,
              ].join(" ")}
            >
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          )}

          {isAuthenticated && (
            <Link
              to="/cart"
              className="relative rounded-md bg-gray-100 px-3 py-2 flex items-center text-sm font-medium text-gray-800 hover:bg-gray-200"
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              Cart
              {getTotalCartItems() > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-semibold text-white">
                  {getTotalCartItems()}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
