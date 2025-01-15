import { ReactNode } from "react";

interface SingleWeatherDetailsProps {
  information: string;
  icon: ReactNode;
  value: string;
}

export default function SingleWeatherDetails({
  information,
  icon,
  value,
}: SingleWeatherDetailsProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold to-black/80">
      <p className="whitespace-nowrap">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
}
