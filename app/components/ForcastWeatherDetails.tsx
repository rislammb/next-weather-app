import { ForcastWeatherDetailsProps } from "../lib/definitions";
import { convertKelvinToCelsius } from "../lib/format";
import Container from "./Container";
import WeatherDetails from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";

export default function ForcastWeatherDetails(
  props: ForcastWeatherDetailsProps
) {
  return (
    <Container className="gap-4 flex-col items-center sm:items-stretch sm:flex-row">
      <section className="flex gap-2 md:gap-4 items-center px-2 md:px-4">
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
      <section className="overflow-x-auto flex justify-between gap-1 md:gap-4 px-2 md:px-4 w-full">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
