"use client";

import type React from "react";
import { useState } from "react";
import Navigation from "@/components/Navbar";
import ProductCard from "@/components/Productcard";
import { useProducts } from "@/context/products-context";
import { useCart } from "@/context/cart-context";

export default function ProductsPage() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getCategories = () => {
    const categories = [
      "All",
      ...new Set(products.map((product) => product.category)),
    ];
    return categories;
  };

  const filteredProducts = getFilteredProducts();

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "var(--color-background)",
  };

  const contentStyle: React.CSSProperties = {
    padding: "2rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: "2rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "var(--color-foreground)",
  };

  const filtersStyle: React.CSSProperties = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const searchInputStyle: React.CSSProperties = {
    padding: "0.75rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    minWidth: "300px",
    backgroundColor: "var(--color-input)",
  };

  const selectStyle: React.CSSProperties = {
    padding: "0.75rem",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    fontSize: "1rem",
    backgroundColor: "var(--color-input)",
    cursor: "pointer",
  };

  const productsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  };

  const noResultsStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "3rem",
    color: "var(--color-muted-foreground)",
    fontSize: "1.1rem",
  };

  return (
    <div style={pageStyle}>
      <Navigation />
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Our Products</h1>

          <div style={filtersStyle}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={selectStyle}
            >
              {getCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={noResultsStyle}>
            No products found matching your criteria.
          </div>
        ) : (
          <div style={productsGridStyle}>
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </div>
  );
}
