import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative overflow-y-hidden bg-gradient-to-r from-neutral-50 to-sky-50">
      <div className="flex items-start justify-around p-5">  

        <h1 className="text-2xl italic bold text-blue-900 font-extrabold">Combat</h1>
        <Menubar className="ml-34 w-[30%] flex gap-10 outline-none border-none">
  <MenubarMenu >
    <MenubarTrigger className="ml-5">Scan Ticket</MenubarTrigger>
    <MenubarTrigger className="ml-5">Recent Ticket</MenubarTrigger>
    <MenubarTrigger> Support</MenubarTrigger>
    
   
  </MenubarMenu>
</Menubar>

<Button className="bg-blue-700 text-cyan-50 " variant="outline">Sign Out</Button>



</div>
    

      <div className="flex mt-[8%] px-4 gap-[18%]">
      <ScrollArea className="h-[280px] w-[350px] mb-2 rounded-md border p-4">
      <h1 className="mt-7">Scan Ticket</h1>
      <br />
      <hr />
      <h1 className="mt-7">Holidays</h1>
      <br />
      <hr />
      <h1 className="mt-7">Analytics</h1>
      <br />
      <hr />
</ScrollArea>

<Avatar className="w-[300px] h-[300px] ">
  <AvatarImage src=".//images/qrcodeimgg.png" />
  <AvatarFallback></AvatarFallback>
</Avatar>

</div>
<div className="flex ml-[47.5%]">
<Button className="bg-blue-700 text-cyan-50 mt-[6%] p-[25px] px-[30px] justify-center" variant="outline">Scan Now</Button>
</div>





        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 mt-2 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

       
      
    </main>
  );
}

