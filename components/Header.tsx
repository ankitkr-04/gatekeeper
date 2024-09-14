import Link from "next/link";
import { Button } from "./ui/button";

interface HeaderProps {
  route?: string;
  label?: string;
  heading: string;
}

const Header = ({ route, label, heading }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="h1-bold text-dark100_light900">{heading}</h1>
      <Link href={`/admin/${route}`}>
        {route && (
          <Button className="primary-gradient min-h-[46px] px-4 py-3 font-semibold !text-light-900">
            {label}
          </Button>
        )}
      </Link>
    </div>
  );
};

export default Header;
