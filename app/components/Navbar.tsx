import Link from "next/link";
import { MdMyLocation, MdOutlineLocationOn, MdSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import { useState } from "react";
import axios from "axios";
import { placeAtom } from "../atom";
import { useAtom } from "jotai";

type WeatherApiResponse = {
  message: string;
  cod: string;
  count: number;
  list: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    dt: number;
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      country: string;
    };
    rain?: {
      [key: string]: number; // e.g., "1h": number
    };
    snow?: {
      [key: string]: number; // e.g., "1h": number
    };
    clouds: {
      all: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
};

export default function Navbar({ location }: { location: string }) {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [place, setPlace] = useAtom(placeAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length > 2) {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );

        setSuggestions(response.data?.list?.map((item) => item.name));
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(name: string) {
    setCity(name);
    setShowSuggestions(false);
  }

  function handleSubmit() {
    if (suggestions.length < 1) {
      setError("Location not found!");
    } else {
      setError("");
      setPlace(city);
      setShowSuggestions(false);
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <Link
            href={"/"}
            className="text-gray-600 hover:text-gray-700 transition-all text-2xl"
          >
            Weather
          </Link>
          <MdSunny className="text-3xl mt-1 text-yellow-500" />
        </p>

        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2xl text-gray-500 hover:opacity-80 cursor-pointer transition-all" />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">{location}</p>
          <div className="relative">
            <SearchBox
              value={city}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
            {showSuggestions && (suggestions.length > 0 || error) && (
              <SuggestionsBox
                suggestions={suggestions}
                onClick={handleSuggestionClick}
                error={error}
              />
            )}
          </div>
        </section>
      </div>
    </nav>
  );
}

interface SuggestionsBoxProps {
  suggestions: string[];
  onClick: (item: string) => void;
  error: string;
}

function SuggestionsBox({ suggestions, onClick, error }: SuggestionsBoxProps) {
  return (
    <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2">
      {suggestions?.length > 0 &&
        suggestions.map((name, index) => (
          <li
            key={index}
            onClick={() => onClick(name)}
            className="cursor-pointer p-1 rounded hover:bg-gray-200"
          >
            {name}
          </li>
        ))}
      {error && <li className="text-red-500 p-1">{error}</li>}
    </ul>
  );
}
