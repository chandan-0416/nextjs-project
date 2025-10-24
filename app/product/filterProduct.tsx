"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Product } from "./page";

type Props = {
  products: Product[];
  search: string;
  category: string;
  ratings: number[];
  tags: string[];
  price: number;
};

export default function FiltertheProduct({
  products,
  search,
  category,
  ratings,
  tags,
  price,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Unique tags (brands + categories)
  const allTags = useMemo(
    () => Array.from(new Set(products.flatMap((p) => [p.brand, p.category]))),
    [products]
  );

  // Helper to update query params
  const updateParam = (key: string, value: string | string[] | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      if (value.length === 0) {
        params.delete(key);
      } else {
        params.delete(key);
        value.forEach((v) => params.append(key, String(v)));
      }
    } else {
      if (value === "" || value === "All" || value === 2000) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    }

    router.push(`/product?${params.toString()}`);
  };

  const toggleArrayParam = (key: string, current: string[] | number[], value: string | number) => {
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateParam(key, updated);
  };

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white sticky top-4">
      <h2 className="font-bold text-black text-xl mb-4 text-center">Filter Products</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by title"
        defaultValue={search}
        onChange={(e) => updateParam("search", e.target.value)}
        className="w-full border border-gray-400 rounded-lg px-3 py-2 mb-3 focus:ring focus:ring-blue-300"
      />

      {/* 📂 Category */}
      <div className="mb-4">
        <label className="font-semibold block mb-1 text-gray-800">Category</label>
        <select
          defaultValue={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="w-full border rounded p-2 text-gray-700"
        >
          <option>All</option>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 🏷️ Tags */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">

        {allTags.map((tag, index) => (
  <button
    key={`${tag}-${index}`} // ✅ guarantees unique key
    onClick={() => toggleArrayParam("tags", tags, tag)}
    className={`px-2 py-1 rounded-full border text-sm ${
      tags.includes(tag)
        ? "bg-blue-500 text-white border-blue-500"
        : "bg-gray-200 text-gray-700 border-gray-300"
    }`}
  >
    {tag}
  </button>
))}


        </div>
      </div>

      {/* ⭐ Rating */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
        {[1, 2, 3, 4, 5].map((r) => (
          <label key={r} className="flex items-center space-x-2 mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={ratings.includes(r)}
              onChange={() => toggleArrayParam("rating", ratings, r)}
              className="accent-blue-600"
            />
            <span>{"⭐".repeat(r)}</span>
          </label>
        ))}
      </div>

      {/* 💰 Price Range */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          defaultValue={price}
          onChange={(e) => updateParam("price", Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <p className="text-center text-gray-700 mt-1">
          Up to <span className="text-blue-600 font-semibold">${price}</span>
        </p>
      </div>
    </div>
  );
}


