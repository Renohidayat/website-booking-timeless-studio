import { initializeApp } from "firebase/app";
import { getFirestore, collection, writeBatch, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dummyPackages = [
  { namaPaket: "Package A", kategori: "Intimate / Duos", hargaDasar: 30000, durasiMenit: 10, maksOrang: 2, deskripsi: "10 Mins Unlimited Shots, 1x Physical Print (4R), All Color-graded Soft Files", isPopular: false },
  { namaPaket: "Package B", kategori: "Group / Family", hargaDasar: 50000, durasiMenit: 15, maksOrang: 4, deskripsi: "15 Mins Unlimited Shots, 2x Physical Prints (4R), All Color-graded Soft Files", isPopular: true },
  { namaPaket: "ID Photo", kategori: "Formal / ID", hargaDasar: 35000, durasiMenit: 10, maksOrang: 1, deskripsi: "Max 5 Best Shots, Prints (2x3, 3x4, 4x6), Retouched Soft File", isPopular: false },
];

const dummySchedules = [
  { tanggal: "2026-09-01", jamMulai: "09:00", jamSelesai: "09:30", statusSlot: "tersedia" },
  { tanggal: "2026-09-01", jamMulai: "09:30", jamSelesai: "10:00", statusSlot: "dipesan" },
  { tanggal: "2026-09-01", jamMulai: "10:00", jamSelesai: "10:30", statusSlot: "tersedia" },
  { tanggal: "2026-09-02", jamMulai: "14:00", jamSelesai: "14:30", statusSlot: "tersedia" },
  { tanggal: "2026-09-02", jamMulai: "14:30", jamSelesai: "15:00", statusSlot: "tidak_tersedia" },
];

async function seed() {
  console.log("Memulai seeding Firestore...");
  const batch = writeBatch(db);

  // Seed Packages
  dummyPackages.forEach((pkg) => {
    const ref = doc(collection(db, "packages"));
    batch.set(ref, pkg);
  });

  // Seed Schedules
  dummySchedules.forEach((sch) => {
    const ref = doc(collection(db, "schedules"));
    batch.set(ref, sch);
  });

  await batch.commit();
  console.log("Seeding Firestore selesai!");
  process.exit(0);
}

seed().catch(console.error);
