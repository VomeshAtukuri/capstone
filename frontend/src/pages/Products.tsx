"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/Productcard";
import { useCart } from "@/context/cart-context";
import { useNavigate } from "react-router";
import { getProducts } from "@/services/products";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/auth-context";
type Product = {
  productId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryName: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
 const { addToCart } = isAuthenticated
    ? useCart()
    : { addToCart: () => {} };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(Array.isArray(productsData) ? productsData : []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.categoryName))),
  ];

  const filtered = products.filter((p) => {
    const q = searchTerm.toLowerCase();
    const name = typeof p.name === "string" ? p.name : "";
    const matchesSearch = name.toLowerCase().includes(q);
    const matchesCat =
      selectedCategory === "All" || p.categoryName === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Our Products</h1>
        </header>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-[280px] flex-1 rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loading message="products..."/>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg bg-card p-8 text-center text-muted-foreground shadow">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.productId}
                product={product as any}
                onAddToCart={(id) => addToCart(id)}
                onViewDetails={() => router(`/products/${product.productId}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
