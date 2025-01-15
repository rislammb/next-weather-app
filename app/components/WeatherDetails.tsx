import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";
import SingleWeatherDetails from "./SingleWeatherDetails";
import { WeatherDetailsProps } from "../lib/definitions";

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
