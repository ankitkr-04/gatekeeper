import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

const ActionCard = ({ value, label, icon, description }: ActionCardProps) => {
  return (
    <Card className=" text-dark200_light800  rounded sm:h-48 sm:w-64">
      <CardContent>
        <Link href={`/${value}`}>
          <div className="items-start p-5 font-inter  ">
            {icon && <Image src={icon} alt={label} width={50} height={50} />}
            <h2 className="h3-bold mt-4">{label}</h2>
            <p className="">{description}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
