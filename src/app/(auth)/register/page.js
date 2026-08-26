"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nama: "", email: "", password: "", no_telepon: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create Firebase Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // 2. Set Custom Claim 'pelanggan'
      const token = await userCredential.user.getIdToken();
      const res = await fetch("/api/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token, role: "pelanggan" })
      });
      if (!res.ok) throw new Error("Gagal mengatur role pengguna.");
      
      // Force token refresh to get new claims
      await userCredential.user.getIdToken(true);

      // ponytail: Data Connect user record would be inserted here via GraphQL mutation
      // For now, auth is working. Data Connect integration can be added when DB is live.

      router.push("/");
    } catch (err) {
      setError(err.message || "Gagal melakukan registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Daftar Akun</h2>
          <p className="mt-2 text-sm text-gray-600">Bergabung dengan Timeless Studio</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          
          <div className="space-y-4 rounded-md shadow-sm">
            <input
              type="text" required placeholder="Nama Lengkap"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})}
            />
            <input
              type="email" required placeholder="Email address"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="text" required placeholder="No. Telepon"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.no_telepon} onChange={e => setFormData({...formData, no_telepon: e.target.value})}
            />
            <input
              type="password" required placeholder="Password"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
        
        <p className="mt-10 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
