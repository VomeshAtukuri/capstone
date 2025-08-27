"use client";

import type React from "react";
import { useState } from "react";
import { useProducts } from "@/context/products-context";

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  const categories = ["Electronics", "Clothing", "Home", "Sports"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image,
      stock: Number.parseInt(formData.stock),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }

    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      stock: "",
    });
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock.toString(),
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      stock: "",
    });
  };

  const totalProducts = products.length;
  const totalCategories = new Set(products.map((p) => p.category)).size;
  const averagePrice =
    products.reduce((sum, p) => sum + p.price, 0) / products.length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1e293b",
            }}
          >
            Admin Dashboard
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d4ed8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            Add New Product
          </button>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
              }}
            >
              Total Products
            </h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1e293b",
              }}
            >
              {totalProducts}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
              }}
            >
              Categories
            </h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1e293b",
              }}
            >
              {totalCategories}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
              }}
            >
              Average Price
            </h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1e293b",
              }}
            >
              ${averagePrice.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.5rem",
              }}
            >
              Low Stock Items
            </h3>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: lowStockProducts > 0 ? "#dc2626" : "#1e293b",
              }}
            >
              {lowStockProducts}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: showAddForm ? "1fr 400px" : "1fr",
            gap: "2rem",
          }}
        >
          {/* Products Table */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1e293b",
                }}
              >
                Products ({products.length})
              </h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Product
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Stock
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      <td style={{ padding: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                          <div>
                            <p
                              style={{
                                fontWeight: "600",
                                color: "#1e293b",
                                marginBottom: "0.25rem",
                              }}
                            >
                              {product.name}
                            </p>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#64748b",
                              }}
                            >
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            backgroundColor: "#e0f2fe",
                            color: "#0369a1",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "12px",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                          }}
                        >
                          {product.category}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#1e293b",
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            color: product.stock < 10 ? "#dc2626" : "#059669",
                            fontWeight: "600",
                          }}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => handleEdit(product)}
                            style={{
                              backgroundColor: "#f59e0b",
                              color: "white",
                              padding: "0.5rem 1rem",
                              borderRadius: "6px",
                              border: "none",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                              cursor: "pointer",
                              transition: "background-color 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#d97706")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f59e0b")
                            }
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this product?"
                                )
                              ) {
                                deleteProduct(product.id);
                              }
                            }}
                            style={{
                              backgroundColor: "#dc2626",
                              color: "white",
                              padding: "0.5rem 1rem",
                              borderRadius: "6px",
                              border: "none",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                              cursor: "pointer",
                              transition: "background-color 0.2s",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#b91c1c")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#dc2626")
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                height: "fit-content",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "1.5rem",
                }}
              >
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      backgroundColor: "#2563eb",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      border: "none",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1d4ed8")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#2563eb")
                    }
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{
                      backgroundColor: "#6b7280",
                      color: "white",
                      padding: "0.75rem 1rem",
                      borderRadius: "6px",
                      border: "none",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#4b5563")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#6b7280")
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
