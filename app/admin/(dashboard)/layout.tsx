export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main>
            LEFTSIDEBAR
            <div className="md:hidden">
                MOBILENAV
            </div>
            {children}
        </main>
    )
  }
  