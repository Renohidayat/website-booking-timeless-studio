"use client";

import { useAuth } from "@/lib/auth-context";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentPage() {
  const { kode_booking } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;
    setIsSubmitting(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (loading || !user) return <div className="p-12 text-center">Memuat...</div>;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 text-center rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bukti Berhasil Diunggah</h2>
          <p className="text-gray-600 mb-6">Admin kami akan memverifikasi pembayaran Anda segera. Terima kasih!</p>
          <Link href="/history" className="text-indigo-600 font-semibold hover:text-indigo-500">Lihat Riwayat Pesanan</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Pembayaran Booking</h2>
            <p className="text-indigo-200 text-sm mt-1">Kode: {kode_booking}</p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Instruksi Pembayaran</h3>
              <p className="text-sm text-blue-800 mb-2">Silakan transfer sesuai total tagihan ke rekening berikut:</p>
              <div className="bg-white p-3 rounded text-center border font-mono text-lg font-bold text-gray-900 tracking-wider">
                BCA 1234567890<br/>
                <span className="text-sm text-gray-500 tracking-normal font-sans">a.n. Timeless Studio</span>
              </div>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Bukti Transfer</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setFile(e.target.files[0])} accept="image/*" required />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">{file ? file.name : "PNG, JPG up to 2MB"}</p>
                  </div>
                </div>
              </div>

              <button
                type="submit" disabled={!file || isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? "Mengunggah..." : "Konfirmasi Pembayaran"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
