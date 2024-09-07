import BarcodeScanner from "@/components/BarcodeScanner";
import Header from "@/components/Header";

const Page = () => {
  return (
    <div>
      <Header heading="Scan Tickets" />

      <BarcodeScanner />
    </div>
  );
};

export default Page;
