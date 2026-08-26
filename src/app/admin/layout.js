import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-studio-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-studio-900 text-white flex flex-col">
          <div className="p-6 pb-2">
            <Link href="/" className="block">
              <h2 className="text-xl font-serif font-bold text-white tracking-wide">TIMELESS</h2>
              <p className="text-[10px] text-studio-400 tracking-[0.2em] uppercase mt-1">Admin Panel</p>
            </Link>
          </div>
          <nav className="flex-1 px-4 mt-8 space-y-1 text-sm font-medium">
            <Link href="/admin/dashboard" className="block px-4 py-3 rounded-sm bg-white/10 text-white">Dashboard</Link>
            <Link href="/admin/bookings" className="block px-4 py-3 rounded-sm text-studio-400 hover:bg-white/5 hover:text-white transition">Bookings</Link>
            <Link href="/admin/packages" className="block px-4 py-3 rounded-sm text-studio-400 hover:bg-white/5 hover:text-white transition">Packages</Link>
            <Link href="/admin/schedules" className="block px-4 py-3 rounded-sm text-studio-400 hover:bg-white/5 hover:text-white transition">Schedules</Link>
            <Link href="/admin/vouchers" className="block px-4 py-3 rounded-sm text-studio-400 hover:bg-white/5 hover:text-white transition">Vouchers</Link>
            <Link href="/admin/reports" className="block px-4 py-3 rounded-sm text-studio-400 hover:bg-white/5 hover:text-white transition">Reports</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
