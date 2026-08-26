import { getPackages } from "@/lib/data";
import Link from "next/link";

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Katalog Paket</h2>
          <p className="mt-4 text-lg text-gray-500">Pilih paket self-photo yang paling cocok untuk Anda.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.id_paket} className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-900">{pkg.nama_paket}</h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight text-gray-900">Rp {pkg.harga_dasar.toLocaleString('id-ID')}</span>
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">{pkg.deskripsi}</p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                  Durasi {pkg.durasi_menit} Menit
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                  Maksimal {pkg.maks_orang} Orang
                </li>
              </ul>
              <Link
                href={`/booking?paket=${pkg.id_paket}`}
                className="mt-8 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Pilih Paket Ini
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
