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

  // Fetch data when the component first loads
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-2">
          Welcome to your Inventory Management System.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Products
            </h2>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-slate-800 leading-none">
            {counts.products}
          </p>
        </div>

        {/* Categories Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Categories
            </h2>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-slate-800 leading-none">
            {counts.categories}
          </p>
        </div>

        {/* Suppliers Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Suppliers
            </h2>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-5xl font-bold text-slate-800 leading-none">
            {counts.suppliers}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
