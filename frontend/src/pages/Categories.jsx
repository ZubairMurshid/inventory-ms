import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";
import { getSuppliers } from "../services/supplierService.js";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    primarySupplier: null,
  });

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      alert("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "primarySupplierId") {
      setNewCategory({
        ...newCategory,
        primarySupplier: value ? { id: parseInt(value, 10) } : null,
      });
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      try {
        await updateCategory(editingId, newCategory);
        fetchCategories();
        setEditingId(null);
        setNewCategory({
          name: "",
          primarySupplier: null,
        });
      } catch (err) {
        alert("Failed to update category");
        console.error("Error updating category:", err);
      }
    } else {
      try {
        await createCategory(newCategory);
        fetchCategories();
        setNewCategory({
          name: "",
          primarySupplier: null,
        });
      } catch (err) {
        alert("Failed to create category");
        console.error("Error creating category:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        alert("Failed to delete category");
        console.error("Error deleting category:", err);
      }
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setNewCategory({
      name: category.name,
      primarySupplier: category.primarySupplier ? { id: category.primarySupplier.id } : null,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewCategory({
      name: "",
      primarySupplier: null,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-700">
          {editingId ? "Edit Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <input
            name="name"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <select
            name="primarySupplierId"
            value={newCategory.primarySupplier?.id || ""}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
          >
            <option value="">No Primary Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {editingId ? "Update Category" : "Add Category"}
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

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-medium">
              <tr>
                <th className="p-4 border-b border-slate-200 w-24">ID</th>
                <th className="p-4 border-b border-slate-200">Name</th>
                <th className="p-4 border-b border-slate-200">Primary Supplier</th>
                <th className="p-4 border-b border-slate-200 text-center w-40">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 text-sm font-mono">{c.id}</td>
                  <td className="p-4 font-medium text-slate-800">{c.name}</td>
                  <td className="p-4 text-slate-600">{c.primarySupplier ? c.primarySupplier.name : "N/A"}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(c)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No categories found. Add your first category above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
