import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebase/config";

export const dummyPackages = [
  { id: "pkg1", namaPaket: "Package A", kategori: "Intimate / Duos", hargaDasar: 30000, durasiMenit: 10, maksOrang: 2, deskripsi: "10 Mins Unlimited Shots, 1x Physical Print (4R), All Color-graded Soft Files", isPopular: false },
  { id: "pkg2", namaPaket: "Package B", kategori: "Group / Family", hargaDasar: 50000, durasiMenit: 15, maksOrang: 4, deskripsi: "15 Mins Unlimited Shots, 2x Physical Prints (4R), All Color-graded Soft Files", isPopular: true },
  { id: "pkg3", namaPaket: "ID Photo", kategori: "Formal / ID", hargaDasar: 35000, durasiMenit: 10, maksOrang: 1, deskripsi: "Max 5 Best Shots, Prints (2x3, 3x4, 4x6), Retouched Soft File", isPopular: false },
];

export const dummySchedules = [
  { id: "sch1", tanggal: "2026-09-01", jamMulai: "09:00", jamSelesai: "09:30", statusSlot: "tersedia" },
  { id: "sch2", tanggal: "2026-09-01", jamMulai: "09:30", jamSelesai: "10:00", statusSlot: "dipesan" },
  { id: "sch3", tanggal: "2026-09-01", jamMulai: "10:00", jamSelesai: "10:30", statusSlot: "tersedia" },
  { id: "sch4", tanggal: "2026-09-02", jamMulai: "14:00", jamSelesai: "14:30", statusSlot: "tersedia" },
  { id: "sch5", tanggal: "2026-09-02", jamMulai: "14:30", jamSelesai: "15:00", statusSlot: "tidak_tersedia" },
];

export const getPackages = async () => {
  const q = query(collection(db, "packages"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id,
      id_paket: doc.id, 
      nama_paket: data.namaPaket,
      kategori: data.kategori,
      harga_dasar: data.hargaDasar,
      durasi_menit: data.durasiMenit,
      maks_orang: data.maksOrang,
      deskripsi: data.deskripsi,
      isPopular: data.isPopular,
      ...data
    };
  });
};

export const getPackageById = async (id) => {
  const docRef = doc(db, "packages", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
};

export const getAdditionalServices = async () => {
  const q = query(collection(db, "additionalServices"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getSchedules = async (tanggal) => {
  let q = query(collection(db, "schedules"));
  if (tanggal) {
    q = query(collection(db, "schedules"), where("tanggal", "==", tanggal));
  }
  
  const snapshot = await getDocs(q);
  const schedules = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      id_jadwal: doc.id,
      tanggal: data.tanggal,
      jam_mulai: data.jamMulai,
      jam_selesai: data.jamSelesai,
      status_slot: data.statusSlot,
      ...data
    };
  });
  
  // Sort by tanggal then by jamMulai in memory to avoid Firestore Composite Index requirements
  schedules.sort((a, b) => {
    if (a.tanggal === b.tanggal) {
      return a.jam_mulai.localeCompare(b.jam_mulai);
    }
    return a.tanggal.localeCompare(b.tanggal);
  });
  
  return schedules;
};

export const getVouchers = async () => {
  const q = query(collection(db, "vouchers"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const checkVoucherKode = async (kode) => {
  const q = query(collection(db, "vouchers"), where("kodeVoucher", "==", kode));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const getBookings = async () => {
  const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Manual join for Package and Schedule
  for (let b of bookings) {
    if (b.packageId) {
      const pkg = await getPackageById(b.packageId);
      b.package = pkg || { namaPaket: "Unknown Package" };
    }
    if (b.scheduleId) {
      const schRef = doc(db, "schedules", b.scheduleId);
      const schSnap = await getDoc(schRef);
      b.schedule = schSnap.exists() ? { id: schSnap.id, ...schSnap.data() } : { tanggal: "-", jamMulai: "-" };
    }
  }
  
  return bookings;
};

export const getBookingById = async (kode) => {
  const q = query(collection(db, "bookings"), where("kodeBooking", "==", kode));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  
  const b = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  if (b.packageId) {
    b.package = await getPackageById(b.packageId);
  }
  if (b.scheduleId) {
    const schRef = doc(db, "schedules", b.scheduleId);
    const schSnap = await getDoc(schRef);
    b.schedule = schSnap.exists() ? { id: schSnap.id, ...schSnap.data() } : null;
  }
  return b;
};
