import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex items-start justify-around p-5">
      <h1 className="text-2xl font-extrabold italic text-blue-900">Combat</h1>
      <Menubar className="ml-32 flex w-[30%] gap-10 border-none outline-none">
        <MenubarMenu>
          <MenubarTrigger className="ml-5">Scan Ticket</MenubarTrigger>
          <MenubarTrigger className="ml-5">Recent Ticket</MenubarTrigger>
          <MenubarTrigger> Support</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default Navbar;
