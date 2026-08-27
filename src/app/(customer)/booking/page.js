"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPackages, getAdditionalServices, getSchedules, checkVoucherKode } from "@/lib/data";
import { createBookingAction } from "@/app/admin/actions";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";

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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");
  
  // User Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    } else if (user) {
       setEmail(user.email);
       // Split email for default name
       setName(user.email.split("@")[0]);
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function loadInitialData() {
      const [pkgs, svcs] = await Promise.all([getPackages(), getAdditionalServices()]);
      setPackages(pkgs);
      setServices(svcs);
      if (initialPaketId) {
        const pkg = pkgs.find(p => String(p.id_paket) === String(initialPaketId) || String(p.id) === String(initialPaketId));
        setSelectedPaket(pkg || pkgs[0]);
      } else {
        // Default select the first package if none provided
        setSelectedPaket(pkgs[0]);
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

  if (loading || authLoading || !user) return <div className="p-12 text-center min-h-[calc(100vh-72px)]">Memuat...</div>;

  // Kalkulasi
  const subtotalPaket = selectedPaket ? selectedPaket.harga_dasar : 0;
  const subtotalLayanan = Object.entries(selectedServices).reduce((sum, [id, qty]) => {
    const svc = services.find(s => String(s.id) === String(id) || String(s.id_layanan) === String(id));
    return sum + (svc ? svc.hargaSatuan * qty : 0);
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
    const v = await checkVoucherKode(voucherCode);
    if (v) {
      setAppliedVoucher(v);
    } else {
      setVoucherError("Kode voucher tidak valid.");
      setAppliedVoucher(null);
    }
  };

  const handleServiceChange = (id, change) => {
    setSelectedServices(prev => {
      const current = prev[id] || 0;
      const next = current + change;
      if (next < 0) return prev;
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const proceedToStep2 = () => {
    if (!selectedSchedule) {
      alert("Please select a time slot first.");
      return;
    }
    setStep(2);
  };

  const submitBooking = async () => {
    if (!name || !phone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    if (!selectedPaket || !selectedSchedule) {
      alert("Terjadi kesalahan: Paket atau jadwal belum dipilih.");
      return;
    }
    
    const kodeBooking = `BKG-${Date.now().toString().slice(-6)}`;
    
    try {
      await createBookingAction({
        kodeBooking,
        namaPelanggan: name,
        email: email || "guest@example.com",
        noHp: phone,
        packageId: selectedPaket.id_paket || selectedPaket.id,
        scheduleId: selectedSchedule.id_jadwal || selectedSchedule.id,
        totalHarga: totalBayar
      });
      router.push(`/payment/${kodeBooking}`);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat booking.");
    }
  };

  return (
    <>
      <Navbar />
      
      {step === 1 && (
        <section className="flex-col p-6 lg:p-12 bg-white min-h-[calc(100vh-72px)]">
            <div className="max-w-3xl mx-auto w-full space-y-8 pt-8">
                <div className="border-b border-studio-200 pb-6">
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-studio-500">Step 1 of 3</span>
                    <h2 className="text-3xl font-serif font-semibold text-studio-900 mt-2">Select Date & Time</h2>
                    {selectedPaket && <p className="mt-2 text-sm text-studio-600 font-medium">Package: {selectedPaket.nama_paket}</p>}
                </div>

                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-medium text-studio-900 mb-3">Choose Date</label>
                        <input 
                          type="date" 
                          value={selectedDate} 
                          onChange={(e) => { setSelectedDate(e.target.value); setSelectedSchedule(null); }}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-studio-50 border border-studio-200 p-4 text-sm text-studio-900 font-medium focus:ring-1 focus:ring-studio-900 focus:border-studio-900 focus:outline-none rounded-sm transition" 
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-studio-900">Available Time Slots</label>
                            <div className="flex items-center gap-4 text-xs text-studio-500">
                                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-studio-900"></span> Available</span>
                                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-studio-300"></span> Booked</span>
                            </div>
                        </div>

                        {schedules.length === 0 ? (
                           <p className="text-sm text-red-600">No slots available on this date.</p>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {schedules.map(s => (
                                <button 
                                  key={s.id_jadwal}
                                  onClick={() => setSelectedSchedule(s)} 
                                  className={`p-3 border text-sm font-medium text-center transition rounded-sm ${selectedSchedule?.id_jadwal === s.id_jadwal ? 'bg-studio-900 text-white border-studio-900' : 'border-studio-200 hover:border-studio-900 text-studio-900 bg-white'}`}
                                >
                                  {s.jam_mulai} - {s.jam_selesai}
                                </button>
                              ))}
                          </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-studio-200">
                        <button onClick={() => router.push('/packages')} className="text-sm text-studio-500 hover:text-studio-900 transition">
                            Back
                        </button>
                        <button onClick={proceedToStep2} className="btn-primary px-8 py-3 rounded-sm text-sm font-medium tracking-wide">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </section>
      )}

      {step === 2 && (
        <section className="flex-col p-6 lg:p-12 bg-studio-50 min-h-[calc(100vh-72px)]">
            <div className="max-w-5xl mx-auto w-full grid md:grid-cols-5 gap-12 pt-8">
                {/* Form */}
                <div className="md:col-span-3 space-y-8">
                    <div className="border-b border-studio-200 pb-6">
                        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-studio-500">Step 2 of 3</span>
                        <h2 className="text-3xl font-serif font-semibold text-studio-900 mt-2">Your Details</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-medium uppercase tracking-wider text-studio-500 mb-2">Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full bg-white border border-studio-200 p-3.5 text-sm font-medium focus:ring-1 focus:ring-studio-900 focus:border-studio-900 focus:outline-none rounded-sm transition" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium uppercase tracking-wider text-studio-500 mb-2">Phone</label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="08..." className="w-full bg-white border border-studio-200 p-3.5 text-sm font-medium focus:ring-1 focus:ring-studio-900 focus:border-studio-900 focus:outline-none rounded-sm transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium uppercase tracking-wider text-studio-500 mb-2">Email</label>
                                <input type="email" value={email} disabled className="w-full bg-studio-100 border border-studio-200 p-3.5 text-sm font-medium text-studio-500 rounded-sm cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-studio-200">
                            <h4 className="text-sm font-medium text-studio-900 mb-4">Add-ons</h4>
                            <div className="space-y-3">
                                {services.map(s => (
                                  <div key={s.id_layanan} className="flex items-center justify-between p-4 bg-white border border-studio-200 rounded-sm">
                                      <div>
                                          <span className="text-sm font-medium text-studio-900 block">{s.nama_layanan}</span>
                                          <span className="text-xs text-studio-500">+Rp {s.harga_satuan.toLocaleString('id-ID')}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                          <button onClick={() => handleServiceChange(s.id_layanan, -1)} className="w-8 h-8 flex items-center justify-center border border-studio-200 hover:border-studio-900 transition rounded-sm text-studio-600">-</button>
                                          <span className="text-sm font-medium w-4 text-center">{selectedServices[s.id_layanan] || 0}</span>
                                          <button onClick={() => handleServiceChange(s.id_layanan, 1)} className="w-8 h-8 flex items-center justify-center border border-studio-200 hover:border-studio-900 transition rounded-sm text-studio-600">+</button>
                                      </div>
                                  </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="md:col-span-2">
                    <div className="bg-white p-8 border border-studio-200 rounded-sm sticky top-24">
                        <h3 className="font-serif font-semibold text-xl text-studio-900 mb-6">Summary</h3>

                        <div className="space-y-3 text-sm mb-6 border-b border-studio-200 pb-6">
                            <div className="flex justify-between">
                                <span className="text-studio-500">Package</span>
                                <span className="font-medium text-studio-900">{selectedPaket?.nama_paket || "-"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-studio-500">Date</span>
                                <span className="font-medium text-studio-900">{selectedDate || "-"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-studio-500">Time</span>
                                <span className="font-medium text-studio-900">{selectedSchedule?.jam_mulai || "-"}</span>
                            </div>
                        </div>

                        <div className="mb-6 border-b border-studio-200 pb-6">
                            <label className="block text-xs font-medium uppercase tracking-wider text-studio-500 mb-2">Promo Code</label>
                            <div className="flex gap-2">
                                <input type="text" value={voucherCode} onChange={e => setVoucherCode(e.target.value.toUpperCase())} className="w-full bg-studio-50 border border-studio-200 p-2.5 text-sm uppercase font-medium focus:ring-1 focus:ring-studio-900 focus:outline-none rounded-sm transition" />
                                <button onClick={handleApplyVoucher} className="btn-outline px-4 text-xs font-medium rounded-sm">Apply</button>
                            </div>
                            {voucherError && <p className="text-xs font-medium text-red-600 mt-2">{voucherError}</p>}
                            {appliedVoucher && <p className="text-xs font-medium text-green-700 mt-2">Code applied successfully.</p>}
                        </div>

                        <div className="space-y-2 text-sm mb-8">
                            <div className="flex justify-between text-studio-600">
                                <span>Subtotal</span>
                                <span>Rp {subtotalPaket.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-studio-600">
                                <span>Add-ons</span>
                                <span>Rp {subtotalLayanan.toLocaleString('id-ID')}</span>
                            </div>
                            {diskon > 0 && (
                              <div className="flex justify-between text-green-700 font-medium">
                                  <span>Discount</span>
                                  <span>-Rp {diskon.toLocaleString('id-ID')}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-lg font-semibold text-studio-900 pt-4 border-t border-studio-200">
                                <span>Total</span>
                                <span>Rp {totalBayar.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <button onClick={submitBooking} className="btn-primary w-full py-4 rounded-sm text-sm font-medium tracking-wide uppercase">
                            Proceed to Payment
                        </button>
                        <button onClick={() => setStep(1)} className="w-full text-center text-xs text-studio-500 hover:text-studio-900 mt-4 transition">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </section>
      )}
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Memuat...</div>}>
      <BookingFlow />
    </Suspense>
  );
}
