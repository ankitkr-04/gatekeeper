import Header from "@/components/Header";
import MuseumTable from "@/components/MuseumTable";

const page = () => {
    
  return (
    <div>
      <Header
        route="museum"
        heading="All Museums"
        label="Add a Museum"
      />
      <br />

      <MuseumTable/>


    </div>
  );
};

export default page;
