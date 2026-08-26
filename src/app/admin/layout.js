import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6">
            <h2 className="text-xl font-bold text-indigo-400">Timeless Admin</h2>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <Link href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-slate-800">Dashboard</Link>
            <Link href="/admin/packages" className="block px-4 py-2 rounded hover:bg-slate-800">Paket & Layanan</Link>
            {/* Navigasi lain akan ditambahkan sesuai issue berikutnya */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
