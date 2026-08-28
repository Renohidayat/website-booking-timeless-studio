const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

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
  const d = await getDoc(doc(db, "packages", "OpLWV2QibAGmWp4lJRbC"));
  console.log(d.data());
}

check().catch(console.error);
