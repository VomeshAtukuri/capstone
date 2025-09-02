"use client";
type Product = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  categoryName: string;
  stock: number;
};

import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getProductbyid } from "@/services/products";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const productId = Number(params.id);
  const { isAuthenticated } = useAuth();
  const { addToCart } = isAuthenticated
    ? useCart()
    : { addToCart: () => {} };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const product = await getProductbyid(productId);
      setProduct(product);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <Loading message="product.." />;
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Product not found
          </h2>
          <Link
            to="/products"
            className="text-sm text-emerald-700 hover:underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.productId);
    toast.success("Product added to cart!");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="text-emerald-700 hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/products" className="text-emerald-700 hover:underline">
            Products
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <img
              src={
                product.imageUrl ||
                "/placeholder.svg?height=400&width=800&query=product"
              }
              alt={product.name}
              className="h-96 w-full rounded-lg object-cover shadow"
            />
          </div>

          <div>
            <span className="mb-3 inline-block rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
              {product.categoryName}
            </span>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              {product.name}
            </h1>
            <div className="mb-4 text-2xl font-bold text-emerald-600">
              ₹{product.price}
            </div>
            <p className="mb-6 text-base leading-relaxed text-foreground">
              {product.description}
            </p>

            <div className="mb-6 flex gap-3">
              <button
                className="flex-1 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white 
             hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || !isAuthenticated}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : !isAuthenticated
                  ? "Login to Buy"
                  : "Add to Cart"}
              </button>

              <Link
                to="/products"
                className="flex items-center justify-center rounded-md bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-500/20"
              >
                Back to Products
              </Link>
            </div>

            <div className="rounded-lg bg-card p-4 shadow">
              <h3 className="mb-3 font-semibold text-card-foreground">
                Product Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="border-b border-border pb-2">
                  ✓ High Quality Materials
                </li>
                <li className="border-b border-border pb-2">
                  ✓ Fast & Free Shipping
                </li>
                <li className="border-b border-border pb-2">
                  ✓ 30-Day Return Policy
                </li>
                <li className="">✓ 1 Year Warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
