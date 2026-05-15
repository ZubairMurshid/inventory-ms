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
    <div style={{ padding: "20px" }}>
      <h1>Suppliers</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          name="name"
          placeholder="Name"
          value={newSupplier.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={newSupplier.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={newSupplier.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={newSupplier.address}
          onChange={handleChange}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Supplier" : "Add Supplier"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.address}</td>
                <td>
                  <button
                    onClick={() => handleEdit(s)}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;
