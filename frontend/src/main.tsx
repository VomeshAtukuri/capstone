// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import Approuter from "@/routers/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Approuter />
  </React.StrictMode>
);
