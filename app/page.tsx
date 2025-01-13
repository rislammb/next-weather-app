"use client";

import { useQuery } from "react-query";
import Navbar from "./components/Navbar";
import axios from "axios";
import { format } from "date-fns";
import Container from "./components/Container";
import { convertKelvinToCelsius, getDayOrNightIcon } from "./utils/format";
import WeatherIcon from "./components/WeatherIcon";

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export default function Home() {
  const { isLoading, data } = useQuery<WeatherData>("weatherData", async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=rajshahi&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    return data;
  });

  const firstData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      {isLoading ? (
        <main className="flex-1 flex items-center justify-center">
          <p className="animate-bounce">Loading...</p>
        </main>
      ) : (
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          <section className="space-y-4">
            <div className="space-y-2">
              <h1 className="flex gap-1 text-2xl items-end">
                <span>{format(firstData?.dt_txt ?? "", "EEEE")}</span>
                <span className="text-lg">
                  ({format(firstData?.dt_txt ?? "", "dd.MM.yyyy")})
                </span>
              </h1>
              <Container className="gap-4 sm:gap-6 px-6 items-center">
                <div className="flex flex-col px-4">
                  <h4 className="text-5xl">
                    {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                  </h4>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>Feels like</span>
                    <span>
                      {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                    </span>
                  </p>
                  <p className="text-xs space-x-2">
                    <span>
                      {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                    </span>
                    <span>
                      {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 sm:gap-6 overflow-x-auto w-full justify-between pr-3">
                  {data?.list?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {format(item?.dt_txt, "h:mm a")}
                      </p>
                      <WeatherIcon
                        iconName={getDayOrNightIcon(
                          item?.weather[0]?.icon,
                          item.dt_txt
                        )}
                      />
                      <p>{convertKelvinToCelsius(item?.main?.temp ?? 0)}°</p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </section>

          <section></section>
        </main>
      )}
    </div>
  );
}
