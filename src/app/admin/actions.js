"use server";

import { revalidatePath } from "next/cache";
import { createSchedule, updateScheduleStatus, deleteSchedule } from "@/lib/dataconnect-sdk";
import { dataConnect } from "@/lib/data-connect";

export async function deleteScheduleAction(id) {
  await deleteSchedule(dataConnect, { id });
  revalidatePath("/admin/schedules");
}

export async function createScheduleAction(data) {
  await createSchedule(dataConnect, {
    tanggal: data.tanggal,
    jamMulai: data.jam_mulai,
    jamSelesai: data.jam_selesai,
    statusSlot: data.status_slot || "tersedia"
  });
  revalidatePath("/admin/schedules");
}

export async function updateScheduleAction(id, data) {
  await updateScheduleStatus(dataConnect, {
    id: id,
    statusSlot: data.status_slot
  });
  revalidatePath("/admin/schedules");
}
