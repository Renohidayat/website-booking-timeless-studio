import { NextResponse } from "next/server";
// We will import SDK dynamically since it might not be generated yet during this step
import { dummyPackages, dummySchedules } from "@/lib/data";

export async function GET() {
  try {
    // Only import if it exists, to avoid build errors if SDK not ready
    const { createPackage, createSchedule } = await import("@/lib/dataconnect-sdk");
    const { dataConnect } = await import("@/lib/data-connect");

    let count = 0;
    
    // Seed Packages
    for (const pkg of dummyPackages) {
      await createPackage(dataConnect, {
        namaPaket: pkg.nama_paket,
        kategori: pkg.kategori,
        hargaDasar: pkg.harga_dasar,
        durasiMenit: pkg.durasi_menit,
        maksOrang: pkg.maks_orang,
        deskripsi: pkg.deskripsi,
        isPopular: pkg.isPopular || false
      });
      count++;
    }

    // Seed Schedules
    for (const sched of dummySchedules) {
      await createSchedule(dataConnect, {
        tanggal: sched.tanggal,
        jamMulai: sched.jam_mulai,
        jamSelesai: sched.jam_selesai,
        statusSlot: sched.status_slot
      });
      count++;
    }

    return NextResponse.json({ message: `Successfully seeded ${count} rows to Data Connect PostgreSQL!` });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
