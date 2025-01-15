"use client";

import { useSearchParams } from "next/navigation";
import { MdOutlineLocationOn } from "react-icons/md";

export default function SearchedLocation() {
  const searchParams = useSearchParams();

  return (
    <>
      <MdOutlineLocationOn className="text-3xl" />
      <p className="text-slate-900/80 text-sm">
        {searchParams.get("place")?.toString()}
      </p>
    </>
  );
}
