import Link from "next/link";
import { MdMyLocation, MdOutlineLocationOn, MdSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

export default function Navbar() {
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
          <p className="text-slate-900/80 text-sm">Rajshahi</p>
          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
