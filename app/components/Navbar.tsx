import Link from "next/link";
import { MdSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import MyLocation from "./MyLocation";
import SearchedLocation from "./SearchedLocation";
import SuggestionsBox from "./SuggestionsBox";

export default async function Navbar() {
  // async function handleInputChange(value: string) {
  //   setCity(value);
  //   if (value.length > 2) {
  //     try {
  //       const response = await axios.get<WeatherApiResponse>(
  //         `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  //       );

  //       setError("");
  //       setShowSuggestions(true);
  //     } catch {
  //       setSuggestions([]);
  //       setShowSuggestions(false);
  //     }
  //   } else {
  //     setSuggestions([]);
  //     setShowSuggestions(false);
  //   }
  // }

  // function handleSuggestionClick(name: string) {
  //   setCity(name);
  //   setShowSuggestions(false);
  // }

  // function handleSubmit() {
  //   setLoadingCity(true);
  //   if (suggestions.length < 1) {
  //     setError("Location not found!");
  //     setLoadingCity(false);
  //   } else {
  //     setError("");
  //     setPlace(city);
  //     setShowSuggestions(false);
  //     setTimeout(() => {
  //       setLoadingCity(false);
  //     }, 500);
  //   }
  // }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="w-full flex justify-between items-center max-w-7xl p-3 mx-auto gap-2">
        <p className="flex items-center justify-center gap-2">
          <Link
            href={"/"}
            className="text-gray-600 hover:text-gray-700 transition-all text-2xl"
          >
            Weather
          </Link>
          <MdSunny className="text-3xl mt-1 text-yellow-500" />
        </p>

        <section className="flex gap-2 items-start sm:items-center flex-col sm:flex-row">
          <div className="flex gap-2 items-center">
            <MyLocation />
            <SearchedLocation />
          </div>
          <div className="relative">
            <SearchBox />
            <SuggestionsBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
