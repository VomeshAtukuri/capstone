import App from "@/App";
import Footer from "@/components/Footer";
import AdminPage from "@/pages/Admin";
import CartPage from "@/pages/Cart";
import LoginPage from "@/pages/Login";
import OrdersPage from "@/pages/Orders";
import ProductDetailsPage from "@/pages/ProductDetails";
import ProductsPage from "@/pages/Products";
import RegisterPage from "@/pages/Register";
import { type JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />

        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* 
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} /> */}
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
      <Footer />
    </BrowserRouter>
  );
}
