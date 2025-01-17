"use client";

import { MdMyLocation } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MyLocation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const params = new URLSearchParams(searchParams);
        params.delete("place");
        if (latitude && longitude) {
          params.set("lat", latitude.toString());
          params.set("lon", longitude.toString());
        } else {
          params.delete("lat");
          params.delete("lon");
        }
        replace(`${pathname}?${params.toString()}`);
      });
    }
  };

  return (
    <MdMyLocation
      title="Your current location"
      onClick={handleCurrentLocation}
      className="text-2xl text-gray-700 hover:opacity-80 cursor-pointer transition-all"
    />
  );
}
