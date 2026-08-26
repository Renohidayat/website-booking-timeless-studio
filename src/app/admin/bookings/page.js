export default function AdminBookingsPage() {
  const mockBookings = [
    { id: 1, kode: "BKG-123456", pelanggan: "Reno Hidayat", paket: "Self Photo Basic", tanggal: "2026-09-01", status: "menunggu_pembayaran", total: 100000 },
    { id: 2, kode: "BKG-987654", pelanggan: "Asep", paket: "Self Photo Group", tanggal: "2026-09-01", status: "dibayar", total: 150000 },
  ];

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Manajemen Pemesanan</h1>
          <p className="mt-2 text-sm text-gray-700">Kelola data booking, verifikasi pembayaran, dan data pelanggan.</p>
        </div>
      </div>
      
      <div className="mt-4 flow-root">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Kode Booking</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pelanggan</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Paket & Tanggal</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Tagihan</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockBookings.map((b) => (
                <tr key={b.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900">{b.kode}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{b.pelanggan}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {b.paket}<br/>
                    <span className="text-xs text-gray-400">{b.tanggal}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Rp {b.total.toLocaleString('id-ID')}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      b.status === 'dibayar' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                      'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                    }`}>
                      {b.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {b.status === 'menunggu_pembayaran' ? (
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">Verifikasi Bayar</button>
                    ) : (
                      <button className="text-gray-600 hover:text-gray-900 mr-4">Detail</button>
                    )}
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
