"use server";

import { revalidatePath } from "next/cache";
import { dummySchedules } from "@/lib/data";

export async function deleteSchedule(id) {
  const index = dummySchedules.findIndex((s) => s.id_jadwal === id);
  if (index !== -1) {
    dummySchedules.splice(index, 1);
  }
  revalidatePath("/admin/schedules");
}

export async function createSchedule(data) {
  const newId = dummySchedules.length > 0 ? Math.max(...dummySchedules.map(s => s.id_jadwal)) + 1 : 1;
  dummySchedules.push({
    id_jadwal: newId,
    tanggal: data.tanggal,
    jam_mulai: data.jam_mulai,
    jam_selesai: data.jam_selesai,
    status_slot: data.status_slot || "tersedia"
  });
  revalidatePath("/admin/schedules");
}

export async function updateSchedule(id, data) {
  const index = dummySchedules.findIndex((s) => s.id_jadwal === id);
  if (index !== -1) {
    dummySchedules[index] = { ...dummySchedules[index], ...data };
  }
  revalidatePath("/admin/schedules");
}
