import "@/styles/globals.css";
import "@/styles/otherStyles.css";
import { ClerkProvider } from "@clerk/nextjs";
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
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider appearance={{}}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
