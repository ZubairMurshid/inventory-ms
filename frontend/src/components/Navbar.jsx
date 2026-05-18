import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center text-white">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">I</div>
        <span className="text-xl font-bold tracking-tight">InventoryPro</span>
      </div>
      
      <div className="flex gap-6">
        <Link to="/" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
        <Link to="/products" className="text-slate-300 hover:text-white transition-colors">Products</Link>
        <Link to="/categories" className="text-slate-300 hover:text-white transition-colors">Categories</Link>
        <Link to="/suppliers" className="text-slate-300 hover:text-white transition-colors">Suppliers</Link>
      </div>
    </nav>
  );
}

export default Navbar;