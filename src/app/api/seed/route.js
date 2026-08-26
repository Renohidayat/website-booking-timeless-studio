import { NextResponse } from "next/server";
// We will import SDK dynamically since it might not be generated yet during this step
import { dummyPackages, dummySchedules, dummyAdditionalServices } from "@/lib/data";

export async function GET() {
  try {
    // Only import if it exists, to avoid build errors if SDK not ready
    const { createPackage, createSchedule } = await import("@/lib/dataconnect-sdk");
    const { dataConnect } = await import("@/lib/data-connect");

    let count = 0;
    
    // Seed Packages
    for (const pkg of dummyPackages) {
      await createPackage(dataConnect, {
        nama_paket: pkg.nama_paket,
        kategori: pkg.kategori,
        harga_dasar: pkg.harga_dasar,
        durasi_menit: pkg.durasi_menit,
        maks_orang: pkg.maks_orang,
        deskripsi: pkg.deskripsi,
        isPopular: pkg.isPopular || false
      });
      count++;
    }

    // Seed Schedules
    for (const sched of dummySchedules) {
      await createSchedule(dataConnect, {
        tanggal: sched.tanggal,
        jam_mulai: sched.jam_mulai,
        jam_selesai: sched.jam_selesai,
        status_slot: sched.status_slot
      });
      count++;
    }

    return NextResponse.json({ message: `Successfully seeded ${count} rows to Data Connect PostgreSQL!` });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
