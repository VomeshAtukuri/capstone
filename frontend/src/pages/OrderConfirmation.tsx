import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <svg className="h-10 w-10 text-emerald-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 7.53a.75.75 0 0 0-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25c.293.293.767.293 1.06 0l5.25-5.25Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Order confirmed</span>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Thank you for your purchase! Your order has been successfully placed and you will receive a confirmation email
          shortly.
        </p>
        <section
          aria-labelledby="order-number-heading"
          className="mb-12 rounded-lg bg-card p-6 text-card-foreground shadow-sm"
        >
          <h2 id="order-number-heading" className="mb-2 text-base font-semibold">
            Order Number
          </h2>
          <p className="text-2xl font-bold text-primary">{orderId}</p>
        </section>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Continue Shopping
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-md bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
          >
            Browse Products
          </Link>
        </div>
      </main>
    </div>
  )
}
