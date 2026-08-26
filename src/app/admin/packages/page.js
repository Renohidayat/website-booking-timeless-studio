import { getPackages, getAdditionalServices } from "@/lib/data";

export default async function AdminPackagesPage() {
  const packages = await getPackages();
  const services = await getAdditionalServices();

  return (
    <div className="space-y-8">
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">Manajemen Paket</h1>
            <p className="mt-2 text-sm text-gray-700">Daftar semua paket self photo studio.</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              Tambah Paket
            </button>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Nama Paket</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Harga</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Durasi (Menit)</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Maks Orang</th>
                      <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {packages.map((pkg) => (
                      <tr key={pkg.id_paket}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{pkg.nama_paket}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Rp {pkg.harga_dasar.toLocaleString('id-ID')}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{pkg.durasi_menit}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{pkg.maks_orang}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">Layanan Tambahan</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              Tambah Layanan
            </button>
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Nama Layanan</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Harga Satuan</th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {services.map((svc) => (
                  <tr key={svc.id_layanan}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{svc.nama_layanan}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Rp {svc.harga_satuan.toLocaleString('id-ID')}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
