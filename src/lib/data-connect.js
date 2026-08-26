import { initializeApp, getApps } from "firebase/app";
import { getDataConnect, connectDataConnectEmulator } from "firebase/data-connect";
import { connectorConfig } from "./dataconnect-sdk";

// Re-use existing app initialization if it exists
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Data Connect
export const dataConnect = getDataConnect(app, connectorConfig);

// For local development, we could connect to the emulator if needed:
// if (process.env.NODE_ENV === "development") {
//   connectDataConnectEmulator(dataConnect, "127.0.0.1", 9399);
// }
