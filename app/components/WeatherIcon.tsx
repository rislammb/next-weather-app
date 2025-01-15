import Image from "next/image";
import { cn } from "../lib/cn";

interface WeatherIconProps {
  iconName: string;
  className?: string;
}

export default function WeatherIcon({ iconName, className }: WeatherIconProps) {
  return (
    <div className={cn("relative h-20 w-20", className)}>
      <Image
        width={100}
        height={100}
        alt={`Weather icon${iconName}`}
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        priority={true}
      />
    </div>
  );
}
