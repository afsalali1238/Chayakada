import type { Metadata } from "next";
import { Inter, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansMalayalam = Noto_Sans_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nadan Chayakada | Kerala Monsoon Radio",
  description: "Nostalgic Malayalam melodies, old radio classics, and rainy day tea shop vibes in a cinematic radio experience.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23b45309' rx='20'/><text x='50' y='65' font-size='50' text-anchor='middle' fill='white' font-family='sans-serif'>ചാ</text></svg>",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansMalayalam.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
