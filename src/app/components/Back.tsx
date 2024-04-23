"use client";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const BackHome = () => {
  const routes = useRouter();
  return (
    <div className="top-2 absolute">
      <ArrowUturnLeftIcon
        onClick={routes.back}
        className="h-12 w-12  hover:w-20 hover:h-20 hover:text-sky-700  transition-all duration-300"
      />
    </div>
  );
};

export default BackHome;
