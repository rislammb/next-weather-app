import { ReactNode } from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface WeatherDetailsProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails({
  visibility,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
}: WeatherDetailsProps) {
  return (
    <>
      <SingleWeatherDetails
        information="Visibility"
        icon={<LuEye />}
        value={visibility}
      />
      <SingleWeatherDetails
        information="Humidity"
        icon={<FiDroplet />}
        value={humidity}
      />
      <SingleWeatherDetails
        information="Wind speed"
        icon={<MdAir />}
        value={windSpeed}
      />
      <SingleWeatherDetails
        information="Air pressure"
        icon={<ImMeter />}
        value={airPressure}
      />
      <SingleWeatherDetails
        information="Sunrise"
        icon={<LuSunrise />}
        value={sunrise}
      />
      <SingleWeatherDetails
        information="Sunset"
        icon={<LuSunset />}
        value={sunset}
      />
    </>
  );
}

interface SingleWeatherDetailsProps {
  information: string;
  icon: ReactNode;
  value: string;
}

function SingleWeatherDetails({
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
