"use client";

import { MdMyLocation } from "react-icons/md";
import { fetchMyLocation } from "../lib/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MyLocation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const name = await fetchMyLocation(latitude, longitude);

        const params = new URLSearchParams(searchParams);
        if (name) {
          params.set("place", name);
        } else {
          params.delete("place");
        }
        replace(`${pathname}?${params.toString()}`);
      });
    }
  }

  return (
    <MdMyLocation
      title="Your current location"
      onClick={handleCurrentLocation}
      className="text-2xl text-gray-500 hover:opacity-80 cursor-pointer transition-all"
    />
  );
}
