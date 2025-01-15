import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SuggestionsBox({
  onClick,
  suggestions,
}: {
  onClick: (name: string) => void;
  suggestions: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(name: string) {
    const params = new URLSearchParams(searchParams);
    params.set("place", name);
    replace(`${pathname}?${params.toString()}`);
    onClick(name);
  }

  return (
    <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2">
      {suggestions?.length > 0 &&
        suggestions.map((name, index) => (
          <li
            key={index}
            onClick={() => handleClick(name)}
            className="cursor-pointer p-1 rounded hover:bg-gray-200"
          >
            {name}
          </li>
        ))}
    </ul>
  );
}
