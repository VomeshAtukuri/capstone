"use client";

import { Link } from "react-router";
import { useProducts } from "@/context/products-context";
import { useCart } from "@/context/cart-context";
import Navigation from "@/components/Navbar";
import ProductCard from "@/components/Productcard";

export default function HomePage() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  const heroStyle = {
    background:
      "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
    color: "white",
    padding: "4rem 2rem",
    textAlign: "center" as const,
    marginBottom: "3rem",
  };

  const heroTitleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  };

  const heroSubtitleStyle = {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    opacity: 0.9,
  };

  const ctaButtonStyle = {
    display: "inline-block",
    backgroundColor: "var(--color-accent)",
    color: "var(--color-accent-foreground)",
    padding: "1rem 2rem",
    borderRadius: "var(--radius-lg)",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.125rem",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  };

  const featuredSectionStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem 4rem",
  };

  const sectionTitleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: "2rem",
    color: "var(--color-foreground)",
  };

  const productsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  };

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "var(--color-background)" }}
    >
      <Navigation />
      <main>
        <section style={heroStyle}>
          <h1 style={heroTitleStyle}>Welcome to ShopHub</h1>
          <p style={heroSubtitleStyle}>
            Discover amazing products at unbeatable prices
          </p>
          <Link
            to="/products"
            style={ctaButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
          >
            Shop Now
          </Link>
        </section>

        <section style={featuredSectionStyle}>
          <h2 style={sectionTitleStyle}>Featured Products</h2>
          <div style={productsGridStyle}>
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={() =>
                  (window.location.href = `/products/${product.id}`)
                }
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
