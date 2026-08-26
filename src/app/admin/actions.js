"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function deleteScheduleAction(id) {
  await deleteDoc(doc(db, "schedules", id));
  revalidatePath("/admin/schedules");
}

export async function createScheduleAction(data) {
  await addDoc(collection(db, "schedules"), {
    tanggal: data.tanggal,
    jamMulai: data.jam_mulai,
    jamSelesai: data.jam_selesai,
    statusSlot: data.status_slot || "tersedia"
  });
  revalidatePath("/admin/schedules");
}

export async function updateScheduleAction(id, data) {
  await updateDoc(doc(db, "schedules", id), {
    statusSlot: data.status_slot
  });
  revalidatePath("/admin/schedules");
}

export async function createBookingAction(data) {
  // Use a custom ID if provided, otherwise let Firestore generate it
  await addDoc(collection(db, "bookings"), {
    kodeBooking: data.kodeBooking,
    namaPelanggan: data.namaPelanggan,
    email: data.email,
    noHp: data.noHp,
    packageId: data.packageId,
    scheduleId: data.scheduleId,
    totalHarga: data.totalHarga,
    status: "menunggu_pembayaran",
    createdAt: Date.now()
  });
  
  // Update schedule status
  await updateDoc(doc(db, "schedules", data.scheduleId), {
    statusSlot: 'dipesan'
  });
  revalidatePath('/admin/bookings');
}

export async function updateBookingStatusAction(id, status) {
  await updateDoc(doc(db, "bookings", id), {
    status: status
  });
  revalidatePath('/admin/bookings');
}
