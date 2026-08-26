"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

export default function Navbar() {
  const { user, role, logout, loading } = useAuth();

  return (
    <nav className="bg-white border-b border-studio-200 sticky top-0 z-50 h-[72px] flex items-center">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Timeless Studio Logo" width={40} height={40} className="object-contain rounded" />
          <div>
            <span className="font-serif font-bold text-xl tracking-wide text-studio-900 block leading-none">TIMELESS</span>
            <span className="text-[10px] text-studio-500 tracking-[0.2em] uppercase block mt-1">Photo Studio</span>
          </div>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-studio-600">
          <Link href="/" className="hover:text-studio-900 transition">Home</Link>
          <Link href="/packages" className="hover:text-studio-900 transition">Packages</Link>
          {user && <Link href="/history" className="hover:text-studio-900 transition">My Ticket</Link>}
          {role === "admin" && <Link href="/admin/dashboard" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">Admin Panel</Link>}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {!loading && user ? (
             <div className="flex items-center gap-4">
                <span className="hidden md:block text-xs font-medium text-studio-500">
                  {user.email.split("@")[0]}
                </span>
                <button
                  onClick={() => logout()}
                  className="btn-outline text-xs px-4 py-2 rounded-sm font-medium tracking-wide"
                >
                  Logout
                </button>
             </div>
          ) : (
            <>
              <Link href="/login" className="text-xs md:text-sm font-medium text-studio-600 hover:text-studio-900 transition">
                Login
              </Link>
              <Link href="/booking" className="btn-primary text-xs md:text-sm px-6 py-2.5 rounded-sm font-medium tracking-wide ml-4">
                Book Session
              </Link>
            </>
          )}
          
          {/* Default Book Button if user is logged in but not an admin */}
          {user && role !== "admin" && (
             <Link href="/booking" className="btn-primary text-xs md:text-sm px-6 py-2.5 rounded-sm font-medium tracking-wide">
               Book Session
             </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
