import { FormEvent } from "react";
import { MdSearch } from "react-icons/md";
import { cn } from "../utils/cn";

interface SearchBoxProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SearchBox({
  className,
  value,
  onChange,
  onSubmit,
}: SearchBoxProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
