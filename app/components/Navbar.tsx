import Link from "next/link";
import { MdSunny } from "react-icons/md";
import MyLocation from "./MyLocation";
import SearchedLocation from "./SearchedLocation";
import SearchLocation from "./SearchLocation";

interface NavbarProps {
  location?: string;
}

export default async function Navbar({ location }: NavbarProps) {
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
            <SearchedLocation location={location} />
          </div>
          <SearchLocation />
        </section>
      </div>
    </nav>
  );
}
