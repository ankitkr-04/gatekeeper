import MobileNav from "@/components/shared/Navbar/MobileNav";
import Theme from "@/components/shared/Navbar/Theme";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/admin" className="flex items-center gap-1">
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Museo<span className="text-primary-500">Bot</span>
        </p>
      </Link>

      {/* Something  to add later*/}

      <div className="flex-between gap-5">
        <Theme />

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
