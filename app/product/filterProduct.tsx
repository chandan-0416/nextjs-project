"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect, startTransition } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
};

type Props = {
  products: Product[];
  search: string;
  category: string;
  ratings: number[];
  tags: string[];
  price: number;
  sort?: "low" | "high";
};

export default function FiltertheProduct({
  products,
  search,
  category,
  ratings,
  tags,
  price,
  sort,
}: Props) {
  const router = useRouter();

  const allCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const allTags = useMemo(
    () => Array.from(new Set(products.flatMap((p) => [p.brand, p.category]))),
    [products]
  );

  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const parseCommaList = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split(",").map((v) => v.trim()).filter(Boolean);
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>(parseCommaList(category));
  const [selectedTags, setSelectedTags] = useState<string[]>(parseCommaList(tags));
  const [selectedRatings, setSelectedRatings] = useState<number[]>(ratings ?? []);
  const [selectedPrice, setSelectedPrice] = useState<number>(price ?? 2000);
  const [selectedSort, setSelectedSort] = useState<"low" | "high" | "">(
    sort ?? ""
  );

  // Mobile toggle
  const [isOpen, setIsOpen] = useState(false);

  // Update URL when filters or sort change
  useEffect(() => {
    const query: Record<string, string> = {};

    if (search) query.search = search;
    if (selectedCategories.length > 0) query.category = selectedCategories.join(",");
    if (selectedTags.length > 0) query.tags = selectedTags.join(",");
    if (selectedRatings.length > 0) query.rating = selectedRatings.join(",");
    if (selectedPrice !== 2000) query.price = String(selectedPrice);
    if (selectedSort) query.sort = selectedSort;

    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    startTransition(() => {
      router.push(`/product?${queryString}`);
    });
  }, [selectedCategories, selectedTags, selectedRatings, selectedPrice, selectedSort, search, router]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((v) => v !== cat) : [...prev, cat]
    );

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((v) => v !== tag) : [...prev, tag]
    );

  const toggleRating = (r: number) =>
    setSelectedRatings((prev) =>
      prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]
    );

  const removeFilter = (type: string, value: string | number) => {
    if (type === "category") setSelectedCategories((prev) => prev.filter((v) => v !== value));
    if (type === "tag") setSelectedTags((prev) => prev.filter((v) => v !== value));
    if (type === "rating") setSelectedRatings((prev) => prev.filter((v) => v !== value));
    if (type === "price") setSelectedPrice(2000);
    if (type === "sort") setSelectedSort("");
  };

  const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 6);

  return (
    <div className="md:sticky md:top-4">
      {/* Mobile toggle button */}
      <button
        className="md:hidden mb-2 w-full bg-blue-600 text-white py-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`
          bg-white shadow-md border rounded-xl p-4
          w-full md:w-auto
          max-h-[90vh] overflow-y-auto
          transition-all duration-300
          ${isOpen ? "block" : "hidden"} md:block
        `}
      >
        <h2 className="font-bold text-black text-xl mb-4 text-center">
          Filter Products
        </h2>

        {(selectedCategories.length > 0 ||
          selectedTags.length > 0 ||
          selectedRatings.length > 0 ||
          selectedPrice !== 2000 ||
          selectedSort) && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Selected Filters</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                >
                  {cat}
                  <button
                    onClick={() => removeFilter("category", cat)}
                    className="hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeFilter("tag", tag)}
                    className="hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {selectedRatings.map((r) => (
                <span
                  key={r}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm flex items-center gap-1"
                >
                  {"⭐".repeat(r)}
                  <button
                    onClick={() => removeFilter("rating", r)}
                    className="hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {selectedPrice !== 2000 && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                  Price: ${selectedPrice}
                  <button
                    onClick={() => removeFilter("price", selectedPrice)}
                    className="hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              )}
              {selectedSort && (
                <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center gap-1">
                  Sort: {selectedSort === "low" ? "Low to High" : "High to Low"}
                  <button
                    onClick={() => removeFilter("sort", selectedSort)}
                    className="hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
          <div className="flex flex-col gap-2">
            {visibleCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="accent-blue-600"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
          {allCategories.length > 6 && (
            <button
              onClick={() => setShowAllCategories((s) => !s)}
              className="text-blue-600 text-sm mt-2"
            >
              {showAllCategories ? "See less" : "See more"}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
          <div className="flex flex-col gap-2">
            {visibleTags.map((tag, index) => (
              <label key={`${tag}-${index}`} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  className="accent-blue-600"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
          {allTags.length > 6 && (
            <button
              onClick={() => setShowAllTags((s) => !s)}
              className="text-blue-600 text-sm mt-2"
            >
              {showAllTags ? "See less" : "See more"}
            </button>
          )}
        </div>

        {/* Ratings */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
          {[1, 2, 3, 4, 5].map((r) => (
            <label key={r} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedRatings.includes(r)}
                onChange={() => toggleRating(r)}
                className="accent-blue-600"
              />
              <span>{"⭐".repeat(r)}</span>
            </label>
          ))}
        </div>

        {/* Price */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
          <input
            type="range"
            min="0.79"
            max="2000"
            step="5"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-center text-gray-700 mt-1">
            Up to <span className="text-blue-600 font-semibold">${selectedPrice}</span>
          </p>
        </div>

        {/* Sort */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Sort By Price</h3>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value as "low" | "high" | "")}
            className="w-full border rounded px-2 py-1 focus:outline-blue-500"
          >
            <option value="">Select</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}



