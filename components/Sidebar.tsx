import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  return (
    <>
      <div className="mt-10 flex items-start justify-between gap-8 px-4">
        {/* Scrollable Area */}
        <ScrollArea className="mb-2 h-[280px] w-[300px] rounded-md border p-4 shadow-md">
          <div className="space-y-8">
            <div>
              <h1 className="text-xl font-semibold">Scan Ticket</h1>
              <hr className="my-2" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Holidays</h1>
              <hr className="my-2" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Analytics</h1>
              <hr className="my-2" />
            </div>
          </div>
        </ScrollArea>

        {/* Avatar */}
        <Avatar className="size-[300px] rounded-lg shadow-lg">
          <AvatarImage src="./images/qrcodeimgg.png" alt="QR Code" />
          <AvatarFallback>QR</AvatarFallback>
        </Avatar>
      </div>

      {/* Scan Button */}
      <div className="mt-8 flex justify-center">
        <Button
          className="rounded-lg bg-blue-700 px-8 py-4 text-white shadow-md transition-all hover:bg-blue-600"
          variant="outline"
        >
          Scan Now
        </Button>
      </div>
    </>
  );
};

export default Sidebar;
