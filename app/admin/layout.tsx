import { ClerkProvider } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <ClerkProvider>{children}</ClerkProvider>
    </body>
  );
}
