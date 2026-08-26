// ponytail: Naive in-memory data store mimicking Data Connect queries.
// Upgrade path: replace with Firebase Data Connect queries when SDK is generated.

export const dummyPackages = [
  {
    id_paket: 1,
    nama_paket: "Paket Self Photo Basic",
    harga_dasar: 100000,
    durasi_menit: 15,
    maks_orang: 2,
    deskripsi: "Sesi foto mandiri selama 15 menit dengan maksimal 2 orang. Dapat semua soft file.",
  },
  {
    id_paket: 2,
    nama_paket: "Paket Self Photo Group",
    harga_dasar: 150000,
    durasi_menit: 20,
    maks_orang: 5,
    deskripsi: "Sesi foto seru bareng teman maksimal 5 orang selama 20 menit.",
  },
];

export const dummyAdditionalServices = [
  {
    id_layanan: 1,
    nama_layanan: "Tambah Orang",
    harga_satuan: 20000,
  },
  {
    id_layanan: 2,
    nama_layanan: "Cetak Foto 4R",
    harga_satuan: 15000,
  },
];

// Async mock functions
export const getPackages = async () => [...dummyPackages];
export const getPackageById = async (id) => dummyPackages.find((p) => p.id_paket === Number(id));

export const getAdditionalServices = async () => [...dummyAdditionalServices];

// Mock Schedules
export const dummySchedules = [
  { id_jadwal: 1, tanggal: "2026-09-01", jam_mulai: "09:00", jam_selesai: "09:30", status_slot: "tersedia" },
  { id_jadwal: 2, tanggal: "2026-09-01", jam_mulai: "09:30", jam_selesai: "10:00", status_slot: "dipesan" },
  { id_jadwal: 3, tanggal: "2026-09-01", jam_mulai: "10:00", jam_selesai: "10:30", status_slot: "tersedia" },
  { id_jadwal: 4, tanggal: "2026-09-02", jam_mulai: "14:00", jam_selesai: "14:30", status_slot: "tersedia" },
  { id_jadwal: 5, tanggal: "2026-09-02", jam_mulai: "14:30", jam_selesai: "15:00", status_slot: "tidak_tersedia" },
];

export const getSchedules = async (tanggal) => {
  return dummySchedules.filter((s) => !tanggal || s.tanggal === tanggal);
};

// Mock Vouchers
export const dummyVouchers = [
  { id_voucher: 1, kode_voucher: "PROMO10", tipe_diskon: "persen", nilai_diskon: 10, tgl_berlaku: "2026-01-01", tgl_berakhir: "2026-12-31", kuota: 100 },
  { id_voucher: 2, kode_voucher: "POTONG50K", tipe_diskon: "nominal", nilai_diskon: 50000, tgl_berlaku: "2026-01-01", tgl_berakhir: "2026-12-31", kuota: 50 },
];

export const getVouchers = async () => [...dummyVouchers];
export const checkVoucher = async (kode) => dummyVouchers.find((v) => v.kode_voucher === kode);
