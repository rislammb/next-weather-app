"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchLocationData } from "../lib/data";

export default function SuggestionsBox() {
  const searchParams = useSearchParams();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  async function fetchSuggestion(term: string) {
    if (term?.length > 2) {
      const data = await fetchLocationData(term);
      if (data) setSuggestions(data?.list?.map((item) => item.name));
    }
  }

  useEffect(() => {
    fetchSuggestion(searchParams.get("place")?.toString() ?? "");
  }, [searchParams.get("place")]);

  return (
    <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2">
      {suggestions?.length > 0 &&
        suggestions.map((name, index) => (
          <li
            key={index}
            onClick={() => {}}
            className="cursor-pointer p-1 rounded hover:bg-gray-200"
          >
            {name}
          </li>
        ))}
      {error && <li className="text-red-500 p-1">{error}</li>}
    </ul>
  );
}
