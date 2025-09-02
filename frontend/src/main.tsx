import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/routers/router";
import Layout from "@/components/Layout";
import "@/index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="bottom-right"/>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
