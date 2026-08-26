import { listPackages, getPackage, listAdditionalServices, listSchedules, getSchedulesByDate, listVouchers, checkVoucher } from "./dataconnect-sdk";
import { dataConnect } from "./data-connect";

// Keep dummy arrays for seeding
export const dummyPackages = [
  { id_paket: 1, nama_paket: "Package A", kategori: "Intimate / Duos", harga_dasar: 30000, durasi_menit: 10, maks_orang: 2, deskripsi: "10 Mins Unlimited Shots, 1x Physical Print (4R), All Color-graded Soft Files", isPopular: false },
  { id_paket: 2, nama_paket: "Package B", kategori: "Group / Family", harga_dasar: 50000, durasi_menit: 15, maks_orang: 4, deskripsi: "15 Mins Unlimited Shots, 2x Physical Prints (4R), All Color-graded Soft Files", isPopular: true },
  { id_paket: 3, nama_paket: "ID Photo", kategori: "Formal / ID", harga_dasar: 35000, durasi_menit: 10, maks_orang: 1, deskripsi: "Max 5 Best Shots, Prints (2x3, 3x4, 4x6), Retouched Soft File", isPopular: false },
];

export const dummySchedules = [
  { id_jadwal: 1, tanggal: "2026-09-01", jam_mulai: "09:00", jam_selesai: "09:30", status_slot: "tersedia" },
  { id_jadwal: 2, tanggal: "2026-09-01", jam_mulai: "09:30", jam_selesai: "10:00", status_slot: "dipesan" },
  { id_jadwal: 3, tanggal: "2026-09-01", jam_mulai: "10:00", jam_selesai: "10:30", status_slot: "tersedia" },
  { id_jadwal: 4, tanggal: "2026-09-02", jam_mulai: "14:00", jam_selesai: "14:30", status_slot: "tersedia" },
  { id_jadwal: 5, tanggal: "2026-09-02", jam_mulai: "14:30", jam_selesai: "15:00", status_slot: "tidak_tersedia" },
];

export const getPackages = async () => {
  const result = await listPackages(dataConnect);
  return result.data.packages;
};

export const getPackageById = async (id) => {
  const result = await getPackage(dataConnect, { id });
  return result.data.package;
};

export const getAdditionalServices = async () => {
  const result = await listAdditionalServices(dataConnect);
  return result.data.additionalServices;
};

export const getSchedules = async (tanggal) => {
  if (tanggal) {
    const result = await getSchedulesByDate(dataConnect, { tanggal });
    return result.data.schedules;
  }
  const result = await listSchedules(dataConnect);
  return result.data.schedules;
};

export const getVouchers = async () => {
  const result = await listVouchers(dataConnect);
  return result.data.vouchers;
};

export const checkVoucherKode = async (kode) => {
  const result = await checkVoucher(dataConnect, { kode });
  return result.data.vouchers[0];
};
