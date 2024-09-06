import Header from "@/components/Header";
import HolidaysTable from "@/components/HolidaysTable";

const page = () => {
  return (
    <div>
      <Header heading="All Holidays" route="/holidays" label="Add Holiday" />
      <HolidaysTable/>
    </div>
  );
};

export default page;
