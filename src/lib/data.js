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
