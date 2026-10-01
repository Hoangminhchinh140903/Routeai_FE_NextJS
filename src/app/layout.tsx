import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "R:t — Smarter Routes. Faster Deliveries.",
    template: "%s | R:t",
  },
  description:
    "R:t (/ruːt/) — Nền tảng tối ưu tuyến đường thông minh cho giao nhận. Đúng tuyến. Đúng thời gian. Cùng R:t.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "R:t — Smarter Routes. Faster Deliveries.",
    description: "Đúng tuyến. Đúng thời gian. Cùng R:t.",
    images: ["/brand/logo-light.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
