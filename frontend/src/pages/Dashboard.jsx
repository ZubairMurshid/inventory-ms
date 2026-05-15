import { useEffect, useState } from "react";
import { getProducts } from "../services/productService.js";
import { getCategories } from "../services/categoryService.js";
import { getSuppliers } from "../services/supplierService.js";

function Dashboard() {
  // State to store the total counts for each entity
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    suppliers: 0,
  });

  // Fetch data when the component first loads
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data from the services
      const productRes = await getProducts();
      const categoryRes = await getCategories();
      const supplierRes = await getSuppliers();

      // Update state with the length of each list
      setCounts({
        products: productRes.data.length,
        categories: categoryRes.data.length,
        suppliers: supplierRes.data.length,
      });
    } catch (err) {
      alert("Failed to fetch dashboard data");
      console.error("Error fetching dashboard data:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Overview</h1>
      <p>Welcome to your Inventory Management System.</p>

      {/* Basic Card Layout */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
        
        <div style={cardStyle}>
          <h2 style={{ color: "#555" }}>Total Products</h2>
          <p style={countTextStyle}>{counts.products}</p>
        </div>

        <div style={cardStyle}>
          <h2 style={{ color: "#555" }}>Total Categories</h2>
          <p style={countTextStyle}>{counts.categories}</p>
        </div>

        <div style={cardStyle}>
          <h2 style={{ color: "#555" }}>Total Suppliers</h2>
          <p style={countTextStyle}>{counts.suppliers}</p>
        </div>

      </div>
    </div>
  );
}

// Simple styles for the dashboard cards
const cardStyle = {
  flex: "1 1 250px",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: "#fefefe",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const countTextStyle = {
  fontSize: "64px",
  fontWeight: "bold",
  margin: "10px 0",
  color: "#222",
};

export default Dashboard;
