import { useAuth } from "@/context/auth-context";

interface Product {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onViewDetails: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const Outofsstock = product.stock === 0;
  const { isAuthenticated } = useAuth();
  return (
    <div className="group rounded-lg bg-card p-4 shadow-md transition hover:shadow-lg">
      <img
        src={
          product.imageUrl ||
          "/placeholder.svg?height=200&width=400&query=product-image"
        }
        alt={product.name}
        className="mb-3 h-48 w-full rounded-md object-cover"
      />
      <h3 className="mb-1 text-lg font-semibold text-card-foreground">
        {product.name}
      </h3>
      <p className="mb-3 text-xl font-bold text-emerald-600">
        ₹{product.price}
      </p>
      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
        {product.description}
      </p>
      <div className="flex gap-2">
        <button
          className="flex-1 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          onClick={() => onAddToCart(product.productId)}
          disabled={Outofsstock || !isAuthenticated}
        >
          Add to Cart
        </button>
        <button
          className="flex-1 rounded-md bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-500/20"
          onClick={onViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
