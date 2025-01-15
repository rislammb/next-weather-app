import axios from "axios";
import { LocationData, WeatherData } from "./definitions";

export async function fetchLocationData(
  place: string
): Promise<LocationData | undefined> {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch location data:", error);
  }
}

export async function fetchWeatherData(
  place: string
): Promise<WeatherData | undefined> {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

export async function fetchMyLocation(
  latitude: number,
  longitude: number
): Promise<string | undefined> {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    return data?.name;
  } catch (error) {
    console.error("Failed to fetch my location:", error);
  }
}
