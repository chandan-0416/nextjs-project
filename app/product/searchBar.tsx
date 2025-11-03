"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState, useEffect } from "react";
import { Search } from "lucide-react"; // ✅ optional icon (if lucide-react is installed)

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  // ✅ Keep input synced with URL when navigating
  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }
    params.delete("page"); // reset pagination

    startTransition(() => {
      router.push(`/product?${params.toString()}`);
    });
  };

  return (
    <div className="w-full bg-white shadow-sm sticky top-14 z-40">
      {/* Wrapper under header */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center w-full gap-3"
        >
          {/* Input Field */}
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for products, brands, or categories..."
              className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition shadow-sm"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

