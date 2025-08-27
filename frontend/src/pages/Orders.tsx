"use client";

import { useOrders } from "@/context/orders-context";

export default function OrdersPage() {
  const { orders } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "processing":
        return "#3b82f6";
      case "shipped":
        return "#8b5cf6";
      case "delivered":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                color: "#64748b",
                marginBottom: "1rem",
              }}
            >
              No orders yet
            </h2>
            <p
              style={{
                color: "#94a3b8",
                marginBottom: "2rem",
              }}
            >
              Start shopping to see your orders here
            </p>
            <a
              href="/products"
              style={{
                display: "inline-block",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                {/* Order Header */}
                <div
                  style={{
                    backgroundColor: "#f1f5f9",
                    padding: "1.5rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          color: "#1e293b",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Order {order.id}
                      </h3>
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Placed on{" "}
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "inline-block",
                          backgroundColor: getStatusColor(order.status),
                          color: "white",
                          padding: "0.5rem 1rem",
                          borderRadius: "20px",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {getStatusText(order.status)}
                      </div>
                      <p
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "#1e293b",
                        }}
                      >
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: "1.5rem" }}>
                  <h4
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "1rem",
                    }}
                  >
                    Items ({order.items.length})
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "1rem",
                          backgroundColor: "#f8fafc",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h5
                            style={{
                              fontSize: "1rem",
                              fontWeight: "600",
                              color: "#1e293b",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {item.name}
                          </h5>
                          <p
                            style={{
                              color: "#64748b",
                              fontSize: "0.875rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Quantity: {item.quantity}
                          </p>
                          <p
                            style={{
                              fontSize: "1.125rem",
                              fontWeight: "600",
                              color: "#2563eb",
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "1.5rem",
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Shipping Address
                  </h4>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {order.shippingAddress.fullName}
                    <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.zipCode}
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
