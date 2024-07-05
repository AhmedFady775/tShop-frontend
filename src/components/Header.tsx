import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  back?: string;
  title: string;
  button?: string;
}

export default function Header({
  back,
  title,
  button,
}: HeaderProps): JSX.Element {
  return (
    <div className="pb-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {back && (
          <Link
            to={back}
            className="py-2 px-4 bg-[#f7f7f7] hover:bg-[#f1f1f1] transition-all w-fit rounded-lg flex items-center gap-2"
          >
            <MoveLeft /> Back
          </Link>
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {button && (
        <Link
          to={`/${button}/new`}
          className="bg-[#ebebeb] hover:bg-[#c2c2c2] transition-all py-2 px-4 rounded"
        >
          Create new {button}
        </Link>
      )}
    </div>
  );
}
