import Link from "next/link";
import { getPackages } from "@/lib/data";
import Navbar from "@/components/Navbar";

export default async function LandingPage() {
  const packages = await getPackages();

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="relative group cursor-pointer mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <span className="relative inline-flex rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-white/10">
            Self Photo Studio Terbaik di Sumedang
          </span>
        </div>
        
        <h2 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
          Capture Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Timeless</span> Moments
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          Studio foto mandiri tanpa fotografer. Bebas berekspresi, bebas gaya. Abadikan momen berharga Anda di Jl. Pangeran Santri No. 42, Sumedang.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/packages" className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-transform hover:scale-105">
            Lihat Paket & Booking
          </Link>
        </div>
      </main>

      {/* Quick Info */}
      <section className="bg-slate-900 py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Privasi Terjaga</h3>
            <p className="text-gray-400 text-sm">Tanpa fotografer, jadilah diri sendiri dengan bebas.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Fasilitas Lengkap</h3>
            <p className="text-gray-400 text-sm">Lighting profesional, properti menarik, dan cetak cepat.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Lokasi Strategis</h3>
            <p className="text-gray-400 text-sm">Mudah diakses di pusat kota Pasarean, Sumedang.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
