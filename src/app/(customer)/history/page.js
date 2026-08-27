"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getBookingsByEmail } from "@/lib/data";

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    } else if (user) {
      getBookingsByEmail(user.email).then(data => {
        setHistory(data);
        setLoading(false);
      });
    }
  }, [user, authLoading, router]);

  if (authLoading || loading || !user) return <div className="p-12 text-center min-h-[calc(100vh-72px)]">Memuat...</div>;

  return (
    <>
      <Navbar />
      <section className="flex-col p-6 lg:p-12 bg-studio-50 min-h-[calc(100vh-72px)] flex items-center justify-start">
          <div className="max-w-md w-full space-y-6 pt-8 pb-12">
              <div className="text-center mb-8">
                  <h2 className="text-3xl font-serif font-semibold text-studio-900 mb-2">My Ticket</h2>
                  <p className="text-studio-500 text-sm">Present this ticket at the front desk.</p>
              </div>

              {history.map((item) => (
                <div key={item.id} className="bg-white border border-studio-200 rounded-sm relative shadow-sm">
                    {/* Ticket Header */}
                    <div className="p-6 border-b border-dashed border-studio-300 relative">
                        <div className="absolute -left-3 -bottom-3 w-6 h-6 bg-studio-50 rounded-full border-r border-studio-200"></div>
                        <div className="absolute -right-3 -bottom-3 w-6 h-6 bg-studio-50 rounded-full border-l border-studio-200"></div>
                        
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-studio-400">{item.package?.kategori || "-"}</span>
                                <h3 className="text-xl font-serif font-semibold text-studio-900">{item.package?.namaPaket || "-"}</h3>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm ${
                                item.status === 'dibayar' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {item.status.replace('_', ' ')}
                            </span>
                        </div>
                        
                        <div className="text-sm text-studio-600">
                            Booking Ref: <span className="font-semibold text-studio-900">{item.kodeBooking}</span>
                        </div>
                    </div>

                    {/* Ticket Body */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <span className="block text-[10px] uppercase tracking-wider text-studio-400 mb-1">Date</span>
                                <span className="block text-sm font-medium text-studio-900">{item.schedule?.tanggal || "-"}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-wider text-studio-400 mb-1">Time</span>
                                <span className="block text-sm font-medium text-studio-900">{item.schedule?.jamMulai} - {item.schedule?.jamSelesai}</span>
                            </div>
                        </div>
                        
                        <div>
                            <span className="block text-[10px] uppercase tracking-wider text-studio-400 mb-1">Guest</span>
                            <span className="block text-sm font-medium text-studio-900">{item.namaPelanggan || user?.email?.split('@')[0] || "Guest"}</span>
                        </div>
                        
                        {/* Barcode Mock */}
                        <div className="pt-4 flex flex-col items-center justify-center border-t border-studio-100">
                            <div className="w-full h-16 bg-[repeating-linear-gradient(90deg,#18181b_0,#18181b_2px,transparent_2px,transparent_4px,#18181b_4px,#18181b_8px,transparent_8px,transparent_12px)] opacity-80 mb-2"></div>
                            <span className="text-[10px] tracking-[0.3em] text-studio-400">{item.kodeBooking}</span>
                        </div>
                    </div>
                </div>
              ))}
              
              {history.length === 0 && (
                <div className="text-center p-8 bg-white border border-studio-200">
                  <p className="text-studio-500">You have no active bookings.</p>
                </div>
              )}
          </div>
      </section>
    </>
  );
}
