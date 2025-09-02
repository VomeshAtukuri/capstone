"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  getProducts,
  addProduct as addProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  type Product,
} from "@/services/products";
import { useOrders } from "@/context/orders-context";

const categoriesList = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home Appliances" },
  { id: 4, name: "Sports" },
];

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const token = localStorage.getItem("token") as string;
  const { orders, updateOrderStatus } = useOrders();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
    imageUrl: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const addProduct = async (productData: any) => {
    const newProduct = await addProductService(productData, token);
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = async (id: number, productData: Product) => {
    await updateProductService(id, productData, token);
    setProducts((prev) =>
      prev.map((p) => (p.productId === id ? { ...p, ...productData } : p))
    );
  };

  const deleteProduct = async (id: number) => {
    await deleteProductService(id, token);
    setProducts((prev) => prev.filter((p) => p.productId !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      name: formData.name,
      price: Number.parseFloat(formData.price),
      categoryId: Number(formData.categoryId),
      description: formData.description,
      imageUrl: formData.imageUrl,
      stock: Number.parseInt(formData.stock || "0"),
    };
    if (editingProduct) {
      updateProduct(editingProduct.productId, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }
    setFormData({
      name: "",
      price: "",
      categoryId: "",
      description: "",
      imageUrl: "",
      stock: "",
    });
  };

  const handleEdit = (product: any) => {
    const matchedCategory = categoriesList.find(
      (c) => c.name === product.categoryName
    );
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: String(product.price ?? ""),
      categoryId: String(matchedCategory?.id ?? ""),
      description: product.description || "",
      imageUrl: product.imageUrl ?? "",
      stock: String(product.stock ?? ""),
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      price: "",
      categoryId: "",
      description: "",
      imageUrl: "",
      stock: "",
    });
  };

  const totalProducts = products.length;
  const totalSales = orders.reduce((total, order) => total + order.total, 0); 
  const totalCategories = new Set(products.map((p) => p.categoryName)).size;
  const averagePrice = products.length
    ? products.reduce((sum, p) => sum + (p as any).price, 0) / products.length
    : 0;
  const lowStockProducts = products.filter(
    (p: any) => (p.stock ?? 0) < 10
  ).length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add New Product
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Products
            </h3>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalProducts}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Categories
            </h3>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalCategories}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Orders
            </h3>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {orders.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Sales
            </h3>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              ₹{totalSales.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Average Price
            </h3>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              ₹{averagePrice.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Low Stock Items
            </h3>
            <p
              className={`mt-1 text-2xl font-bold ${
                lowStockProducts > 0 ? "text-red-600" : "text-slate-900"
              }`}
            >
              {lowStockProducts}
            </p>
          </div>
        </div>

        <div
          className={`grid gap-6 ${
            showAddForm ? "lg:grid-cols-[1fr_380px]" : "lg:grid-cols-1"
          }`}
        >
          <div className="overflow-hidden rounded-xl bg-white shadow">
            <div className="border-b border-slate-200 p-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Products ({products.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">
                      Product
                    </th>
                    <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">
                      Category
                    </th>
                    <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">
                      Price
                    </th>
                    <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">
                      Stock
                    </th>
                    <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr
                      key={product.productId}
                      className="border-b border-slate-100"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              product.imageUrl ||
                              "/placeholder.svg?height=50&width=50&query=product"
                            }
                            alt={product.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              ID: {product.productId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-800">
                          {product.categoryName}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        ₹{Number(product.price).toFixed(2)}
                      </td>
                      <td className="p-3 font-semibold">
                        <span
                          className={`${
                            (product.stock ?? 0) < 10
                              ? "text-red-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {product.stock ?? 0}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
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
                                deleteProduct(product.productId);
                              }
                            }}
                            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
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

          {showAddForm && (
            <div className="h-max rounded-xl bg-white p-4 shadow">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
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
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    className="w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b border-slate-200 p-4">
            <h2 className="text-xl font-semibold text-slate-900">Order Management ({orders.length})</h2>
            <p className="mt-1 text-sm text-slate-600">
              Update order statuses. Changes are saved to client state for demo purposes.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">Order ID</th>
                  <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">Items</th>
                  <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">Date</th>
                  <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">Total</th>
                  <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">Status</th>
                  <th className="border-b border-slate-200 p-3 font-semibold text-slate-700">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100">
                    <td className="p-3">{`#order ${o.id}`}</td>
                    <td className="p-3">
                        <p className="text-xs text-slate-500">{o.items.length} item(s)</p>
                    </td>
                    <td className="p-3">{o.date.split("T")[0] + " " + o.date.split("T")[1]}</td>
                    <td className="p-3 font-semibold text-slate-900">₹{o.total.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          o.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : o.status === "processing"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        defaultValue={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                        className="rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
