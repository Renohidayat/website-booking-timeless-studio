"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Tautan reset sandi telah dikirim ke email Anda. Silakan cek kotak masuk (atau folder spam).");
    } catch (err) {
      setError(err.message || "Gagal mengirim email reset sandi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Lupa Sandi</h2>
          <p className="mt-2 text-sm text-gray-600">Masukkan email Anda untuk menerima tautan reset sandi.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          {message && <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">{message}</div>}
          
          <div className="space-y-4 rounded-md shadow-sm">
            <input
              type="email" required placeholder="Email address"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Tautan Reset"}
          </button>
        </form>
        
        <p className="mt-10 text-center text-sm text-gray-500">
          Kembali ke halaman{" "}
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
