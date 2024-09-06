import BookingsTable from "@/components/BookingsTable";
import Header from "@/components/Header";

const page = () => {
  return (
    <div>
      <Header heading="All Bookings" />
      <BookingsTable />
    </div>
  );
};

export default page;
