import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SuggestionsItem } from "../lib/definitions";

export default function SuggestionsBox({
  onClick,
  suggestions,
}: {
  onClick: (name: string) => void;
  suggestions: SuggestionsItem[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (item: SuggestionsItem) => {
    const params = new URLSearchParams(searchParams);
    params.set("lat", item.coord.lat.toString());
    params.set("lon", item.coord.lon.toString());
    params.delete("place");
    replace(`${pathname}?${params.toString()}`);
    onClick(item.name);
  };

  return (
    <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2">
      {suggestions?.length > 0 &&
        suggestions.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item)}
            className="cursor-pointer p-1 rounded hover:bg-gray-200"
          >
            {item.name}
          </li>
        ))}
    </ul>
  );
}
