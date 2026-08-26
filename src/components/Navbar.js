"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { user, role, logout, loading } = useAuth();

  return (
    <nav className="flex items-center justify-between p-6 md:px-12 lg:px-24">
      <Link href="/" className="text-xl font-bold tracking-widest text-indigo-400 uppercase">
        Timeless
      </Link>
      <div className="space-x-6 flex items-center">
        {!loading && user ? (
          <>
            <span className="text-sm text-gray-300">
              Halo, {user.email.split("@")[0]}
            </span>
            {role === "admin" && (
              <Link href="/admin/dashboard" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                Dashboard Admin
              </Link>
            )}
            <Link href="/history" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
              Riwayat
            </Link>
            <button
              onClick={() => logout()}
              className="text-sm font-medium rounded-full bg-red-600/20 text-red-400 px-5 py-2 hover:bg-red-600/30 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium rounded-full bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500 transition-all">
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
