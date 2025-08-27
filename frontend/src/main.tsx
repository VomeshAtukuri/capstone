import Approuter from "@/routers/router";
import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/cart-context";
import { OrdersProvider } from "./context/orders-context";
import { ProductsProvider } from "./context/products-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <OrdersProvider>
          <Approuter />
        </OrdersProvider>
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
