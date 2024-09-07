import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

const ActionCard = ({ value, label, icon, description }: ActionCardProps) => {
  return (
    <Card className="sm:w-64 sm:h-48 rounded-">
      <CardContent>
        <Link href={`/${value}`}>
          <div className="font-inter items-start p-5  ">
            {icon && <Image src={icon} alt={label} width={50} height={50} />}
            <h2 className="h3-bold mt-4">{label}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
