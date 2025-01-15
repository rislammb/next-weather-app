"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MdSearch } from "react-icons/md";
import SuggestionsBox from "./SuggestionsBox";
import { fetchLocationData } from "../lib/data";
import { cn } from "../lib/cn";

interface SearchBoxProps {
  className?: string;
}

export default function SearchLocation({ className }: SearchBoxProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const [input, setInput] = useState<string>("");
  const [inputForSearch, setInputForSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const fetchSuggestion = useDebouncedCallback(async () => {
    if (input?.length > 2) {
      const data = await fetchLocationData(input);
      if (data) {
        setSuggestions(data?.list?.map((item) => item.name));
        setShowSuggestions(true);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, 300);

  function handleClick(name: string) {
    setInput(name);
    setInputForSearch(name);
    setShowSuggestions(false);
  }

  function handleSubmit() {
    if (input) {
      params.set("place", input);
    } else {
      params.delete("place");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    setInput(searchParams.get("place")?.toString() ?? "");
  }, []);

  useEffect(() => {
    fetchSuggestion();
  }, [input]);

  useEffect(() => {
    if (inputForSearch) {
      params.set("place", inputForSearch);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [inputForSearch]);

  return (
    <div className="relative">
      <form
        className={cn(
          "flex relative items-center justify-center h-10",
          className
        )}
        action={handleSubmit}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search location.."
          className="px-4 py-2 w-[170px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-200 h-full"
        />
        <button
          type="submit"
          className="px-4 py-[9px] bg-blue-600 text-white rounded-r-md focus:outline-none hover:bg-blue-500 h-full transition-all"
        >
          <MdSearch />
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsBox suggestions={suggestions} onClick={handleClick} />
      )}
    </div>
  );
}
