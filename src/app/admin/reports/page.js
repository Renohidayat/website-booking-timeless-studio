export default function AdminReportsPage() {
  const mockReports = [
    { bulan: "September 2026", total_booking: 45, pendapatan: 6750000 },
    { bulan: "Agustus 2026", total_booking: 38, pendapatan: 5200000 },
  ];

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Laporan Transaksi & Cetak Foto</h1>
          <p className="mt-2 text-sm text-gray-700">Ringkasan pendapatan dan transaksi bulanan studio.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Export Laporan PDF
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Pendapatan (Bulan Ini)</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">Rp 6.750.000</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Booking Selesai</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">45 Sesi</dd>
          </div>
        </div>
      </div>

      <div className="mt-4 flow-root">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Bulan</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Booking</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pendapatan</th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockReports.map((r, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{r.bulan}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{r.total_booking}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Rp {r.pendapatan.toLocaleString('id-ID')}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Detail</button>
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
