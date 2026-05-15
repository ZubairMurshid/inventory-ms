import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateCategory(editingId, newCategory);
        setEditingId(null);
      } else {
        await createCategory(newCategory);
      }

      // Reset form
      setNewCategory({
        name: "",
        description: "",
      });

      // Refresh list
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setNewCategory({
      name: category.name,
      description: category.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewCategory({
      name: "",
      description: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Categories</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Category name"
          value={newCategory.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={newCategory.description}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Category" : "Add Category"}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button 
                  onClick={() => handleDelete(c.id)} 
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
