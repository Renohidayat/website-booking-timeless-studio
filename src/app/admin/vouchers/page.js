import { getVouchers } from "@/lib/data";

export default async function AdminVouchersPage() {
  const vouchers = await getVouchers();

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Manajemen Voucher Promo</h1>
          <p className="mt-2 text-sm text-gray-700">Kelola kode promo dan diskon untuk pelanggan.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Tambah Voucher
          </button>
        </div>
      </div>
      
      <div className="mt-4 flow-root">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Kode</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Diskon</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Berlaku Sampai</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sisa Kuota</th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {vouchers.map((v) => (
                <tr key={v.id_voucher}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-indigo-600">{v.kode_voucher}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {v.tipe_diskon === 'persen' ? `${v.nilai_diskon}%` : `Rp ${v.nilai_diskon.toLocaleString('id-ID')}`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{v.tgl_berakhir}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{v.kuota}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
