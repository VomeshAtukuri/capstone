// src/routes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { type JSX } from "react";

import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProductList from "@/pages/ProductList";
import ProductDetails from "@/pages/ProductDetails";

export default function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
       
        {/* <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} /> */}

        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}
