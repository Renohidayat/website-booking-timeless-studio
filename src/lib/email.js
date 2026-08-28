import nodemailer from 'nodemailer';

export async function sendAdminNotification(bookingData) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn("EMAIL_USER atau EMAIL_PASS tidak disetel di .env.local. Notifikasi email tidak dikirim.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const mailOptions = {
      from: `"Timeless Studio System" <${emailUser}>`,
      to: emailUser, // Kirim ke email admin sendiri
      subject: `[LUNAS] Pesanan Baru: ${bookingData.kodeBooking}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #18181b; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">Pembayaran Berhasil Diterima</h2>
          </div>
          <div style="padding: 20px; background-color: #f9fafb;">
            <p>Halo Admin,</p>
            <p>Pesanan dengan kode <strong>${bookingData.kodeBooking}</strong> telah berhasil dilunasi oleh pelanggan.</p>
            
            <h3 style="border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">Detail Pesanan</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #52525b;">Nama Pelanggan:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right;">${bookingData.namaPelanggan || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #52525b;">No. HP:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right;">${bookingData.noHp || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #52525b;">Tanggal Booking:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right;">${bookingData.tanggal || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #52525b;">Jam Mulai:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right;">${bookingData.jamMulai || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #52525b;">Total Dibayar:</td>
                <td style="padding: 8px 0; font-weight: bold; text-align: right; color: #16a34a;">${formatCurrency(bookingData.totalHarga || 0)}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/bookings" style="background-color: #18181b; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Lihat Dasbor Admin</a>
            </div>
          </div>
          <div style="background-color: #eaeaea; color: #71717a; padding: 10px; text-align: center; font-size: 12px;">
            Email ini dikirim otomatis oleh sistem Timeless Studio Booking.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Notifikasi admin berhasil dikirim: %s", info.messageId);
  } catch (error) {
    console.error("Gagal mengirim notifikasi email admin:", error);
  }
}
