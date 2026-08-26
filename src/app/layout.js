import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { AuthProvider } from "@/lib/auth-context";

export const metadata = {
  title: "Timeless Studio Booking",
  description: "Layanan Jasa Kreatif Self Photo Studio",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="font-sans selection:bg-studio-900 selection:text-white flex flex-col min-h-screen">
        <AuthProvider>
          {children}
          
          {/* Global Footer */}
          <footer className="bg-white border-t border-studio-200 py-8 text-center text-xs text-studio-500 tracking-wide mt-auto">
              &copy; 2026 Timeless Photo Studio. All rights reserved.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
