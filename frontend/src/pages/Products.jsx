import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productPayload = {
      ...newProduct,
      price: newProduct.price ? parseFloat(newProduct.price) : 0,
      quantity: newProduct.quantity ? parseInt(newProduct.quantity, 10) : 0,
    };

    if (editingId) {
      try {
        await updateProduct(editingId, productPayload);
        fetchProducts();
        setEditingId(null);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
        });
      } catch (err) {
        alert("Failed to update product");
        console.error("Error updating product:", err);
      }
    } else {
      try {
        await createProduct(productPayload);
        fetchProducts();
        setNewProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
        });
      } catch (err) {
        alert("Failed to create product");
        console.error("Error creating product:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        alert("Failed to delete product");
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-700">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="lg:col-span-4 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* SEARCH AND TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 font-medium">
              <tr>
                <th className="p-4 border-b border-slate-200">ID</th>
                <th className="p-4 border-b border-slate-200">Name</th>
                <th className="p-4 border-b border-slate-200">Description</th>
                <th className="p-4 border-b border-slate-200 text-right">Price</th>
                <th className="p-4 border-b border-slate-200 text-right">Qty</th>
                <th className="p-4 border-b border-slate-200 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-500 text-sm font-mono">{p.id}</td>
                    <td className="p-4 font-medium text-slate-800">{p.name}</td>
                    <td className="p-4 text-slate-600">{p.description}</td>
                    <td className="p-4 text-right text-slate-700 font-semibold">${p.price}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${p.quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {p.quantity}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-500 hover:text-red-600 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No products found. Add your first product above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
