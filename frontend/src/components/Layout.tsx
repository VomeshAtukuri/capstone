// Layout.tsx
import React from "react";
import { CartProvider } from "@/context/cart-context";
import { OrdersProvider } from "@/context/orders-context";
import Navigation from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import { useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth-context";

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <CartProvider isAuthenticated={isAuthenticated}>
      <OrdersProvider isAuthenticated={isAuthenticated}>
        <div className="min-h-screen bg-background text-foreground">
          {!shouldHideNavbar && <Navigation />}
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </div>
      </OrdersProvider>
    </CartProvider>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  </Provider>
);

export default Layout;
