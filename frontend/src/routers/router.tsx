import App from "@/App";
import AdminPage from "@/pages/Admin";
import CartPage from "@/pages/Cart";
import ContactPage from "@/pages/Contact";
import AboutPage from "@/pages/About";
import LoginPage from "@/pages/Login";
import OrdersPage from "@/pages/Orders";
import ProductDetailsPage from "@/pages/ProductDetails";
import OrderConfirmationPage from "@/pages/OrderConfirmation";
import ProductsPage from "@/pages/Products";
import RegisterPage from "@/pages/Register";
import { type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import CheckoutPage from "@/pages/Checkout";

export default function AppRoutes(): JSX.Element {
  return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        
        <Route path="/admin/dashboard" element={<AdminPage />} />

        <Route
          path="*"
          element={
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
  );
}
