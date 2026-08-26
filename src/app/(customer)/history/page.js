"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function HistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Mock data
  const mockHistory = [
    { kode: "BKG-123456", tanggal: "2026-09-01", paket: "Self Photo Basic", total: 100000, status: "menunggu_pembayaran" },
    { kode: "BKG-987654", tanggal: "2026-08-15", paket: "Self Photo Group", total: 150000, status: "selesai" }
  ];

  if (loading || !user) return <div className="p-12 text-center">Memuat...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Riwayat Pemesanan</h2>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {mockHistory.map((item) => (
              <li key={item.kode}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-indigo-600 truncate">{item.kode}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'selesai' ? 'bg-green-100 text-green-800' :
                        item.status === 'menunggu_pembayaran' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status.replace('_', ' ').toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex text-sm text-gray-500">
                      <p className="flex items-center">{item.paket}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Rp {item.total.toLocaleString('id-ID')} &bull; Tanggal Sesi: {item.tanggal}</p>
                    </div>
                  </div>
                  {item.status === 'menunggu_pembayaran' && (
                    <div className="mt-4">
                      <Link href={`/payment/${item.kode}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Selesaikan Pembayaran &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
