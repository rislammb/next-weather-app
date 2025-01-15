"use client";

import { ChangeEvent, FormEvent } from "react";
import { MdSearch } from "react-icons/md";
import { cn } from "../lib/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  className?: string;
}

export default function SearchBox({ className }: SearchBoxProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("place", term);
      } else {
        params.delete("place");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  function handleSubmit() {}

  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
      action={handleSubmit}
    >
      <input
        type="text"
        onChange={handleChange}
        defaultValue={searchParams.get("place")?.toString()}
        placeholder="Search location.."
        className="px-4 py-2 w-[170px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-200 h-full"
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
