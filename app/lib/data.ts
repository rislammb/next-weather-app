import axios from "axios";
import { LocationData, WeatherData } from "./definitions";

export async function fetchLocationData(
  place: string
): Promise<LocationData | undefined> {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch location data:", error);
  }
}

export async function fetchWeatherData(
  place: string
): Promise<WeatherData | undefined> {
  if (place.length < 3) return;
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

export async function fetchWeatherByCoord(
  latitude: number,
  longitude: number
): Promise<WeatherData | undefined> {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch weather by coord:", error);
  }
}
