import "@/styles/globals.css";
import "@/styles/otherStyles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GateKeeper",
  description: "AI chatbot based ticket booking application for museums",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className} lang="en">
      {children}
    </html>
  );
}
