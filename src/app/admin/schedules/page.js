import { getSchedules } from "@/lib/data";
import { ActionButtons, CreateButton } from "@/components/AdminActions";

export default async function AdminSchedulesPage() {
  const schedules = await getSchedules();

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Manajemen Jadwal</h1>
          <p className="mt-2 text-sm text-gray-700">Kelola ketersediaan slot waktu untuk pemesanan.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <CreateButton label="Tambah Jadwal" entityName="Jadwal" />
        </div>
      </div>
      
      <div className="mt-4 flow-root">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Tanggal</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jam Mulai</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jam Selesai</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Aksi</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {schedules.map((s) => (
                <tr key={s.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{s.tanggal}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{s.jamMulai}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{s.jamSelesai}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      s.statusSlot === 'tersedia' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                      s.statusSlot === 'dipesan' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                      'bg-red-50 text-red-700 ring-red-600/10'
                    }`}>
                      {s.statusSlot}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <ActionButtons id={s.id} entityName="Jadwal" />
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
