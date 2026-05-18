import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;
