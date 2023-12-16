"use client";

import { balo } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavigationBar() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  async function handleSearch() {
    router.push(`/${term}`)
    setTerm('');
  }

  return (
    <div className="top-0 pl-10 pr-10 bg-blue-100 w-full h-16 shadow-md flex justify-between items-center">
      <div className={`${balo.className} font-extrabold text-3xl antialiased text-blue-800 uppercase select-none`}>
        Next-Wheater
      </div>
      <div className="flex gap-2">
        <input
        value={term}
          type="text"
          placeholder="Search City.."
          className="p-2 rounded-md "
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
        <button
          onClick={handleSearch}
          className="cursor-pointer p-2 border border-blue-800 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-white"
        >
          Search
        </button>
      </div>
    </div>
  );
}
