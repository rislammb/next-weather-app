import { Suspense } from "react";
import { format, fromUnixTime } from "date-fns";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetails from "./components/WeatherDetails";
import ForcastWeatherDetails from "./components/ForcastWeatherDetails";
import WeatherSkeleton from "./components/WeatherSkeleton";
import { fetchWeatherByCoord, fetchWeatherData } from "./lib/data";
import {
  convertKelvinToCelsius,
  convertWindSpeed,
  getDayOrNightIcon,
  metersToKilometers,
} from "./lib/format";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { place, lat, lon } = await searchParams;
  const data =
    lat && lon
      ? await fetchWeatherByCoord(Number(lat), Number(lon))
      : await fetchWeatherData(place ?? "");

  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list?.map(
        (entry) => new Date(entry?.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates?.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      return entryDate === date;
    });
  });

  return (
    <div className="relative">
      <Navbar
        location={data && `${data?.city?.name}, ${data?.city?.country}`}
      />
      <Suspense fallback={<WeatherSkeleton />}>
        {!place && (!lat || !lon) ? (
          <main className="p-3 max-w-7xl mx-auto">
            <h2 className="text-yellow-600 text-2xl">
              Search for a location to get weather information.
            </h2>
          </main>
        ) : !data ? (
          <main className="p-3 max-w-7xl mx-auto">
            <h2 className="text-yellow-600 text-2xl">Data not found!</h2>
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
                <Container className="gap-2 md:gap-6 px-2 md:px-6 items-center flex-col sm:flex-row">
                  <div className="flex flex-col mx-2 md:px-4">
                    <h4 className="text-5xl">
                      {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                    </h4>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels like</span>
                      <span>
                        {convertKelvinToCelsius(
                          firstData?.main.feels_like ?? 0
                        )}
                        °
                      </span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                        °↓
                      </span>
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                        °↑
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 md:gap-6 overflow-x-auto w-full justify-between pr-3">
                    {data?.list?.slice(0, 8).map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between gap-1 items-center text-xs font-semibold"
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
                        <p className="capitalize leading-none text-center whitespace-nowrap">
                          {item?.weather[0]?.description}
                        </p>
                        <p>{convertKelvinToCelsius(item?.main?.temp ?? 0)}°</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
              <div className="flex gap-2 flex-col items-center sm:items-stretch sm:flex-row">
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {firstData?.weather[0]?.description}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(
                      firstData?.weather[0]?.icon ?? "",
                      firstData?.dt_txt ?? ""
                    )}
                  />
                </Container>
                <Container className="bg-yellow-300/80 px-2 sm:px-6 gap-1 sm:gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visibility={metersToKilometers(firstData?.visibility ?? 0)}
                    humidity={`${firstData?.main?.humidity}%`}
                    windSpeed={convertWindSpeed(firstData?.wind?.speed ?? 0)}
                    airPressure={`${firstData?.main?.pressure} hPa`}
                    sunrise={format(
                      fromUnixTime(data?.city?.sunrise ?? 0),
                      "h:mm a"
                    )}
                    sunset={format(
                      fromUnixTime(data?.city?.sunset ?? 0),
                      "h:mm a"
                    )}
                  />
                </Container>
              </div>
            </section>
            <section className="flex w-full flex-col gap-4">
              <h2 className="text-2xl">Forcast</h2>
              {firstDataForEachDate.map((entry, index) => (
                <ForcastWeatherDetails
                  key={index}
                  weatherIcon={entry?.weather[0].icon ?? ""}
                  date={format(entry?.dt_txt ?? "", "dd.MM")}
                  day={format(entry?.dt_txt ?? "", "EEEE")}
                  temp={entry?.main.temp ?? 0}
                  feels_like={entry?.main.feels_like ?? 0}
                  temp_min={entry?.main.temp_min ?? 0}
                  temp_max={entry?.main.temp_max ?? 0}
                  description={entry?.weather[0].description ?? ""}
                  visibility={metersToKilometers(entry?.visibility ?? 0)}
                  humidity={`${entry?.main.humidity}%`}
                  windSpeed={convertWindSpeed(entry?.wind.speed ?? 0)}
                  airPressure={`${entry?.main.pressure} hPa`}
                  sunrise={format(
                    fromUnixTime(data?.city?.sunrise ?? 0),
                    "h:mm a"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city?.sunset ?? 0),
                    "h:mm a"
                  )}
                />
              ))}
            </section>
          </main>
        )}
      </Suspense>
    </div>
  );
}
