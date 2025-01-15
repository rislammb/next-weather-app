import { MdOutlineLocationOn } from "react-icons/md";

interface SearchedLocationProps {
  location?: string;
}

export default function SearchedLocation({ location }: SearchedLocationProps) {
  return (
    <>
      <MdOutlineLocationOn className="text-3xl" />
      <p className="text-slate-900/80 text-sm max-w-[150px]">{location}</p>
    </>
  );
}
