import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createTransaction } from "@/lib/ronzzpay";

export async function POST(request) {
  try {
    const { kode_booking, payment_method } = await request.json();

    if (!kode_booking || !payment_method) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Ambil data booking
    const bookingRef = doc(db, "bookings", kode_booking);
    const bookingSnap = await getDoc(bookingRef);

    if (!bookingSnap.exists()) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    const bookingData = bookingSnap.data();

    if (bookingData.status === "dibayar") {
      return NextResponse.json({ success: false, message: "Booking is already paid" }, { status: 400 });
    }

    // Hitung total (jika ada add-ons)
    const basePrice = bookingData.package?.price || 0;
    const addOnsPrice = bookingData.addOns?.reduce((total, addon) => total + addon.price, 0) || 0;
    const totalAmount = basePrice + addOnsPrice;

    // Untuk development lokal webhook testing
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (request.headers.get("origin") || "http://localhost:3000");
    const webhookUrl = `${baseUrl}/api/payment/webhook`;

    // Buat transaksi di RonzzPay
    const result = await createTransaction(
      payment_method, // e.g. "qris"
      totalAmount,
      `Pembayaran Booking ${kode_booking}`,
      webhookUrl
    );

    if (result.status && result.data) {
      // Simpan reference ID ke database booking agar bisa dicek statusnya nanti
      await updateDoc(bookingRef, {
        paymentReffId: result.data.reff_id,
        paymentMethod: payment_method,
      });

      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json({ success: false, message: result.message || "Gagal membuat transaksi" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
