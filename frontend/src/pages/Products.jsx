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
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>

                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
