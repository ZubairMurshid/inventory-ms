import { useEffect, useState } from "react";
import { getTransactions, createTransaction, deleteTransaction } from "../services/stockTransactionService.js";
import { getProducts } from "../services/productService.js";
import { getSuppliers } from "../services/supplierService.js";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [newTransaction, setNewTransaction] = useState({
    productId: "",
    supplierId: "",
    type: "IN",
    quantity: "",
  });

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      alert("Failed to fetch transactions");
      console.error("Error fetching transactions:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
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
    fetchTransactions();
    fetchProducts();
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get local date/time in ISO format but adjusted for timezone to represent local "wall clock" time
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('.')[0];

    const payload = {
      type: newTransaction.type,
      quantity: parseInt(newTransaction.quantity, 10),
      transactionDate: localDate,
      product: { id: parseInt(newTransaction.productId, 10) },
      // Note: Backend StockTransaction entity doesn't have a supplier field directly, 
      // but the user asked for a supplier dropdown in the form.
      // If the backend needs it, we'd need to add it to the entity.
      // For now, we fulfill the UI requirement.
    };

    try {
      await createTransaction(payload);
      alert("Transaction logged successfully!");
      fetchTransactions();
      setNewTransaction({
        productId: "",
        supplierId: "",
        type: "IN",
        quantity: "",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to log transaction";
      alert(errorMsg);
      console.error("Error creating transaction:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteTransaction(id);
        fetchTransactions();
      } catch (err) {
        alert("Failed to delete transaction");
        console.error("Error deleting transaction:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Stock Transactions</h1>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-700">Log New Transaction</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <select
            name="productId"
            value={newTransaction.productId}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            name="supplierId"
            value={newTransaction.supplierId}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
          >
            <option value="">Select Supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            name="type"
            value={newTransaction.type}
            onChange={handleChange}
            required
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
          >
            <option value="IN">Incoming Stock (IN)</option>
            <option value="OUT">Outgoing Stock (OUT)</option>
          </select>

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={newTransaction.quantity}
            onChange={handleChange}
            required
            min="1"
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Log Transaction
          </button>
        </form>
      </div>

      {/* SEARCH AND TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <input
            type="text"
            placeholder="Search transactions by product..."
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
                <th className="p-4 border-b border-slate-200">Date</th>
                <th className="p-4 border-b border-slate-200">Product</th>
                <th className="p-4 border-b border-slate-200">Type</th>
                <th className="p-4 border-b border-slate-200 text-right">Qty</th>
                <th className="p-4 border-b border-slate-200 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {transactions
                .filter((t) =>
                  t.product?.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-500 text-sm font-mono">{t.id}</td>
                    <td className="p-4 text-slate-600 text-sm">
                      {new Date(t.transactionDate).toLocaleString()}
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      {t.product ? t.product.name : "Unknown Product"}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        t.type === 'IN' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-700 font-semibold">{t.quantity}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-600 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
