"use client";

import { Link } from "react-router-dom";
import { useCart } from "@/context/cart-context";
import ProductCard from "@/components/Productcard";
import { getProducts } from "@/services/products";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context"; 

type Product = {
  productId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryName: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useAuth(); // ✅ from AuthProvider
  const { addToCart } = isAuthenticated ? useCart() : { addToCart: () => {} };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(Array.isArray(productsData) ? productsData : []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] py-16 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Welcome to CapstoneStore
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base/relaxed opacity-90 md:text-lg">
            Discover amazing products at unbeatable prices
          </p>
          <Link
            to="/products"
            className="inline-block rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow hover:translate-y-[-1px] hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-center text-2xl font-bold text-foreground">
          Featured Products
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.productId}
              product={product as any}
              onAddToCart={(id) => addToCart(id)}
              onViewDetails={() =>
                (window.location.href = `/products/${product.productId}`)
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
