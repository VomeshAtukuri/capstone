import { Link } from "react-router-dom";
import { useOrders } from "@/context/orders-context";
import Loading from "@/components/Loading";
import { useEffect } from "react";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500",
  processing: "bg-blue-500",
  shipped: "bg-violet-500",
  delivered: "bg-emerald-600",
};

export default function OrdersPage() {
  const { orders, loading, refreshOrders } = useOrders();

  useEffect(() => {
    refreshOrders();
  }, []);

  if (loading && orders.length === 0) {
    return <Loading message="your orders.." />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-900">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="mb-2 text-lg font-semibold text-slate-600">
              No orders yet
            </h2>
            <p className="mb-6 text-slate-400">
              Start shopping to see your orders here
            </p>
            <Link
              to="/products"
              className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-xl bg-white shadow"
              >
                <div className="border-b border-slate-200 bg-slate-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="mb-0.5 text-lg font-semibold text-slate-900">
                        Order {order.id}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Placed on{" "}
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`mb-1 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${
                          statusStyles[order.status] ?? "bg-slate-500"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </div>
                      <p className="text-lg font-bold text-slate-900">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="mb-3 text-base font-semibold text-slate-900">
                    Items ({order.items.length})
                  </h4>
                  <div className="flex flex-col gap-3">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex gap-3 rounded-lg bg-slate-50 p-3"
                      >
                        <img
                          src={
                            item.imageUrl ||
                            "/placeholder.svg?height=80&width=80&query=order-item"
                          }
                          alt={item.name}
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="text-sm font-semibold text-slate-900">
                            {item.name}
                          </h5>
                          <p className="text-xs text-slate-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-blue-600">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-slate-900">
                    Shipping Address
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {order.address.fullName}
                    <br />
                    {order.address.addressLine1}
                    <br />
                    {order.address.city}, {order.address.zipCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
