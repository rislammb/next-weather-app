// import { ChangeEventHandler, FormEventHandler } from "react";
import { MdSearch } from "react-icons/md";
import { cn } from "../utils/cn";

interface SearchBoxProps {
  className?: string;
  // value: string;
  // onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  // onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export default function SearchBox({
  className,
}: // value,
// onChange,
// onSubmit,
SearchBoxProps) {
  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
      // onSubmit={onSubmit}
    >
      <input
        type="text"
        // value={value}
        // onChange={onChange}
        placeholder="Search location.."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-200 h-full"
      />
      <button
        type="submit"
        className="px-4 py-[9px] bg-blue-600 text-white rounded-r-md focus:outline-none hover:bg-blue-500 h-full transition-all"
      >
        <MdSearch />
      </button>
    </form>
  );
}
