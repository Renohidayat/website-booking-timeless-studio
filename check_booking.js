const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDgBWKUECR94nyTemi2PUDoSucDi2WVhss",
  authDomain: "timeless-studio-booking.firebaseapp.com",
  projectId: "timeless-studio-booking",
  storageBucket: "timeless-studio-booking.firebasestorage.app",
  messagingSenderId: "98723895742",
  appId: "1:98723895742:web:b8d40b698d06397d9601ef",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const q = query(collection(db, "bookings"), where("kodeBooking", "==", "BKG-284365"));
  const docs = await getDocs(q);
  docs.forEach(d => console.log(d.id, d.data()));
}

check().catch(console.error);
