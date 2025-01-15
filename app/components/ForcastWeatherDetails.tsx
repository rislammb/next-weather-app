import { convertKelvinToCelsius } from "../lib/format";
import Container from "./Container";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";

interface ForcastWeatherDetailsProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForcastWeatherDetails(
  props: ForcastWeatherDetailsProps
) {
  return (
    <Container className="gap-4 flex-col sm:flex-row">
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={props.weatherIcon} />
          <p>{props.date}</p>
          <p className="text-sm">{props.day}</p>
        </div>
        <div>
          <h5 className="text-5xl">{convertKelvinToCelsius(props.temp)}°</h5>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(props.feels_like)}°</span>
          </p>
          <p className="capitalize">{props.description}</p>
        </div>
      </section>
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
