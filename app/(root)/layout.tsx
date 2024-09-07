import Navbar from "@/components/shared/Navbar/Navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
        <div className="mx-auto w-full ">{children}</div>
      </section>
    </body>
  );
};

export default HomeLayout;
