import { useEffect, useState } from "react";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/supplierService.js";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      alert("Failed to fetch suppliers");
      console.error("Error fetching suppliers:", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setNewSupplier({
      ...newSupplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      try {
        await updateSupplier(editingId, newSupplier);
        fetchSuppliers();
        setEditingId(null);
        setNewSupplier({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      } catch (err) {
        alert("Failed to update supplier");
        console.error("Error updating supplier:", err);
      }
    } else {
      try {
        await createSupplier(newSupplier);
        fetchSuppliers();
        setNewSupplier({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      } catch (err) {
        alert("Failed to create supplier");
        console.error("Error creating supplier:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        fetchSuppliers();
      } catch (err) {
        alert("Failed to delete supplier");
        console.error("Error deleting supplier:", err);
      }
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);
    setNewSupplier({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewSupplier({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Suppliers</h1>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-700">
          {editingId ? "Edit Supplier" : "Add New Supplier"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Supplier Name"
            value={newSupplier.name}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={newSupplier.email}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={newSupplier.phone}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="address"
            placeholder="Address"
            value={newSupplier.address}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {editingId ? "Update Supplier" : "Add Supplier"}
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
                <th className="p-4 border-b border-slate-200">ID</th>
                <th className="p-4 border-b border-slate-200">Name</th>
                <th className="p-4 border-b border-slate-200">Email</th>
                <th className="p-4 border-b border-slate-200">Phone</th>
                <th className="p-4 border-b border-slate-200">Address</th>
                <th className="p-4 border-b border-slate-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {suppliers.length > 0 ? (
                suppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-500 text-sm font-mono">{s.id}</td>
                    <td className="p-4 font-medium text-slate-800">{s.name}</td>
                    <td className="p-4 text-slate-600">{s.email || "-"}</td>
                    <td className="p-4 text-slate-600">{s.phone || "-"}</td>
                    <td className="p-4 text-slate-600">{s.address || "-"}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No suppliers found. Add your first supplier above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
