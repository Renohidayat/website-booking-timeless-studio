"use client";

import { useAuth } from "@/lib/auth-context";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

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

  if (loading || !user) return <div className="p-12 text-center min-h-[calc(100vh-72px)]">Memuat...</div>;

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <section className="flex-col p-6 lg:p-12 bg-white min-h-[calc(100vh-72px)] flex items-center justify-center">
            <div className="max-w-md w-full bg-studio-50 p-12 text-center border border-studio-200 rounded-sm">
                <i className="fa-regular fa-circle-check text-5xl text-studio-900 mb-6 block"></i>
                <h2 className="text-2xl font-serif font-semibold text-studio-900 mb-2">Payment Received</h2>
                <p className="text-studio-600 text-sm mb-8">Your receipt has been uploaded successfully. We will verify your payment shortly.</p>
                <Link href="/history" className="btn-primary w-full py-4 rounded-sm text-sm font-medium tracking-wide block uppercase">
                    View My Ticket
                </Link>
            </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="flex-col p-6 lg:p-12 bg-white min-h-[calc(100vh-72px)]">
          <div className="max-w-2xl mx-auto w-full space-y-8 pt-8">
              <div className="border-b border-studio-200 pb-6 text-center">
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-studio-500">Final Step</span>
                  <h2 className="text-3xl font-serif font-semibold text-studio-900 mt-2">Secure Payment</h2>
                  <p className="mt-2 text-sm text-studio-600">Booking Ref: <span className="font-semibold text-studio-900">{kode_booking}</span></p>
              </div>

              <div className="bg-studio-50 p-8 border border-studio-200 rounded-sm space-y-6">
                  <div className="text-center">
                      <p className="text-sm font-medium text-studio-500 uppercase tracking-widest mb-2">Transfer To</p>
                      <h3 className="text-3xl font-serif font-semibold text-studio-900 mb-1">BCA 1234567890</h3>
                      <p className="text-sm text-studio-600">a.n Timeless Studio</p>
                  </div>
                  
                  <div className="text-center pt-6 border-t border-studio-200">
                      <p className="text-sm font-medium text-studio-500 uppercase tracking-widest mb-2">Amount Due</p>
                      <h3 className="text-3xl font-medium text-studio-900 mb-1">Rp 30.000</h3>
                      <p className="text-xs text-studio-500">Please transfer the exact amount.</p>
                  </div>
              </div>

              <div className="space-y-4 pt-4">
                  <label className="block text-xs font-medium uppercase tracking-wider text-studio-500 mb-2">Upload Transfer Receipt</label>
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-studio-200 border-dashed rounded-sm cursor-pointer bg-studio-50 hover:bg-studio-100 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <i className="fa-solid fa-cloud-arrow-up text-2xl text-studio-400 mb-3"></i>
                          <p className="text-sm text-studio-500"><span className="font-semibold text-studio-900">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-studio-400 mt-1">{file ? file.name : "SVG, PNG, JPG or GIF (MAX. 2MB)"}</p>
                      </div>
                      <input id="file-upload" type="file" className="hidden" onChange={e => setFile(e.target.files[0])} accept="image/*" />
                  </label>
                  
                  <button onClick={handleUpload} disabled={!file || isSubmitting} className="btn-primary w-full py-4 rounded-sm text-sm font-medium tracking-wide uppercase disabled:opacity-50">
                      {isSubmitting ? "Mengunggah..." : "Konfirmasi Pembayaran"}
                  </button>
              </div>
          </div>
      </section>
    </>
  );
}
