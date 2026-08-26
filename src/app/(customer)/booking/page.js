"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPackages, getAdditionalServices, getSchedules, checkVoucher } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";

function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const initialPaketId = searchParams.get("paket");

  const [step, setStep] = useState(1);
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking State
  const [selectedPaket, setSelectedPaket] = useState(null);
  const [selectedServices, setSelectedServices] = useState({}); // { id_layanan: jumlah }
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function loadInitialData() {
      const [pkgs, svcs] = await Promise.all([getPackages(), getAdditionalServices()]);
      setPackages(pkgs);
      setServices(svcs);
      if (initialPaketId) {
        const pkg = pkgs.find(p => p.id_paket === Number(initialPaketId));
        if (pkg) setSelectedPaket(pkg);
      }
      setLoading(false);
    }
    loadInitialData();
  }, [initialPaketId]);

  useEffect(() => {
    if (selectedDate) {
      getSchedules(selectedDate).then(data => setSchedules(data.filter(s => s.status_slot === "tersedia")));
    } else {
      setSchedules([]);
    }
  }, [selectedDate]);

  if (loading || authLoading || !user) return <div className="p-12 text-center">Memuat...</div>;

  // Kalkulasi
  const subtotalPaket = selectedPaket ? selectedPaket.harga_dasar : 0;
  const subtotalLayanan = Object.entries(selectedServices).reduce((sum, [id, qty]) => {
    const svc = services.find(s => s.id_layanan === Number(id));
    return sum + (svc ? svc.harga_satuan * qty : 0);
  }, 0);
  const totalSebelumDiskon = subtotalPaket + subtotalLayanan;
  
  let diskon = 0;
  if (appliedVoucher) {
    if (appliedVoucher.tipe_diskon === "persen") diskon = totalSebelumDiskon * (appliedVoucher.nilai_diskon / 100);
    else diskon = appliedVoucher.nilai_diskon;
  }
  const totalBayar = Math.max(0, totalSebelumDiskon - diskon);

  const handleApplyVoucher = async () => {
    setVoucherError("");
    const v = await checkVoucher(voucherCode);
    if (v) {
      setAppliedVoucher(v);
    } else {
      setVoucherError("Kode voucher tidak valid atau kedaluwarsa.");
      setAppliedVoucher(null);
    }
  };

  const handleServiceChange = (id, change) => {
    setSelectedServices(prev => {
      const current = prev[id] || 0;
      const next = current + change;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const submitBooking = async () => {
    // Simulasi insert ke backend
    // Pada implementasi riil, ini akan memanggil Firebase Data Connect
    const kodeBooking = `BKG-${Date.now().toString().slice(-6)}`;
    // Langsung arahkan ke halaman tiket
    router.push(`/booking/${kodeBooking}/ticket`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-slate-900 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Booking Self Photo</h2>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-indigo-500' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">1. Pilih Paket & Layanan Tambahan</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paket Utama</label>
                <select 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={selectedPaket?.id_paket || ""}
                  onChange={(e) => setSelectedPaket(packages.find(p => p.id_paket === Number(e.target.value)))}
                >
                  <option value="" disabled>Pilih Paket</option>
                  {packages.map(p => <option key={p.id_paket} value={p.id_paket}>{p.nama_paket} - Rp {p.harga_dasar.toLocaleString('id-ID')}</option>)}
                </select>
              </div>

              {selectedPaket && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Layanan Tambahan (Opsional)</label>
                  <div className="space-y-3">
                    {services.map(s => (
                      <div key={s.id_layanan} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{s.nama_layanan}</p>
                          <p className="text-sm text-gray-500">+ Rp {s.harga_satuan.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button onClick={() => handleServiceChange(s.id_layanan, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold">-</button>
                          <span className="w-4 text-center">{selectedServices[s.id_layanan] || 0}</span>
                          <button onClick={() => handleServiceChange(s.id_layanan, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button 
                  disabled={!selectedPaket}
                  onClick={() => setStep(2)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-500 disabled:opacity-50"
                >
                  Lanjut ke Jadwal
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">2. Pilih Tanggal & Waktu</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Sesi</label>
                <input
                  type="date"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  value={selectedDate}
                  onChange={(e) => { setSelectedDate(e.target.value); setSelectedSchedule(null); }}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slot Tersedia</label>
                  {schedules.length === 0 ? (
                    <p className="text-sm text-red-600">Maaf, tidak ada slot tersedia di tanggal ini.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {schedules.map(s => (
                        <button
                          key={s.id_jadwal}
                          onClick={() => setSelectedSchedule(s)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                            selectedSchedule?.id_jadwal === s.id_jadwal 
                              ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                              : "border-gray-200 hover:border-indigo-300 text-gray-700"
                          }`}
                        >
                          {s.jam_mulai}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900 font-medium">Kembali</button>
                <button 
                  disabled={!selectedSchedule}
                  onClick={() => setStep(3)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-500 disabled:opacity-50"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">3. Ringkasan & Konfirmasi</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <div>
                    <p className="font-semibold text-gray-900">{selectedPaket.nama_paket}</p>
                    <p className="text-sm text-gray-500">{selectedDate} | {selectedSchedule.jam_mulai} - {selectedSchedule.jam_selesai}</p>
                  </div>
                  <p className="font-semibold text-gray-900">Rp {subtotalPaket.toLocaleString('id-ID')}</p>
                </div>

                {Object.keys(selectedServices).length > 0 && (
                  <div className="pb-4 border-b space-y-2">
                    <p className="text-sm font-medium text-gray-700">Layanan Tambahan:</p>
                    {Object.entries(selectedServices).map(([id, qty]) => {
                      const svc = services.find(s => s.id_layanan === Number(id));
                      return (
                        <div key={id} className="flex justify-between text-sm text-gray-600">
                          <p>{svc.nama_layanan} x {qty}</p>
                          <p>Rp {(svc.harga_satuan * qty).toLocaleString('id-ID')}</p>
                        </div>
                      )
                    })}
                  </div>
                )}

                <div className="pb-4 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Punya Kode Voucher?</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-1 rounded-md border-gray-300 shadow-sm p-2 border text-sm uppercase"
                      placeholder="Masukkan kode promo"
                      value={voucherCode} onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                    />
                    <button onClick={handleApplyVoucher} className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700">Terapkan</button>
                  </div>
                  {voucherError && <p className="text-red-500 text-xs mt-1">{voucherError}</p>}
                  {appliedVoucher && <p className="text-green-600 text-xs mt-1">Voucher '{appliedVoucher.kode_voucher}' berhasil diterapkan!</p>}
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <p>Subtotal</p>
                    <p>Rp {totalSebelumDiskon.toLocaleString('id-ID')}</p>
                  </div>
                  {diskon > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Diskon</p>
                      <p>- Rp {diskon.toLocaleString('id-ID')}</p>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-xl text-gray-900 pt-2 border-t">
                    <p>Total Bayar</p>
                    <p>Rp {totalBayar.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(2)} className="text-gray-600 hover:text-gray-900 font-medium">Kembali</button>
                <button 
                  onClick={submitBooking}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-500 shadow-lg hover:shadow-xl transition-all"
                >
                  Konfirmasi Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingFlow />
    </Suspense>
  );
}
