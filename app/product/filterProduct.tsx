// "use client";

// import { useRouter } from "next/navigation";
// import { useMemo, useState, useEffect, startTransition } from "react"; 

// type Product = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
// };

// type Props = {
//   products: Product[];
//   search: string;
//   category: string;
//   ratings: number[];
//   tags: string[];
//   price: number;
// };

// export default function FiltertheProduct({
//   products,
//   search,
//   category,
//   ratings,
//   tags,
//   price,
// }: Props) {
//   const router = useRouter();

//   // --- Unique filters ---
//   const allCategories = useMemo(
//     () => Array.from(new Set(products.map((p) => p.category))),
//     [products]
//   );

//   const allTags = useMemo(
//     () => Array.from(new Set(products.flatMap((p) => [p.brand, p.category]))),
//     [products]
//   );

//   const [showAllTags, setShowAllTags] = useState(false);
//   const [showAllCategories, setShowAllCategories] = useState(false);

//   // --- Helper to parse incoming values --- utility for handling query parameters
//   const parseCommaList = (value: string | string[] | undefined): string[] => {
//     if (!value) return [];
//     if (Array.isArray(value)) return value;
//     return value
//       .split(",")
//       .map((v) => v.trim())
//       .filter(Boolean);
//   };

//   // --- Selected filters ---
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(parseCommaList(category));
//   const [selectedTags, setSelectedTags] = useState<string[]>(parseCommaList(tags));
//   const [selectedRatings, setSelectedRatings] = useState<number[]>(ratings ?? []);
//   const [selectedPrice, setSelectedPrice] = useState<number>(price);

//   // --- Update URL manually without encoding commas --- | useEffect() runs whenever a dependency changes
//   useEffect(() => {
//     const query: Record<string, string> = {};  //creates an empty object that will hold your query parameters

//     if (search) query.search = search;
//     if (selectedCategories.length > 0) query.category = selectedCategories.join(",");
//     if (selectedTags.length > 0) query.tags = selectedTags.join(",");
//     if (selectedRatings.length > 0) query.rating = selectedRatings.join(",");
//     if (selectedPrice !== 2000) query.price = String(selectedPrice);

//     // Build custom query string manually
//     const queryString = Object.entries(query)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("&");

      
//     startTransition(() => {
//       router.push(`/product?${queryString}`);
//     });
//   }, [selectedCategories, selectedTags, selectedRatings, selectedPrice, search, router]);

//   // --- Toggle handlers --- Use in Filter  | Spread operator => merging the element of Array | ...prev spreads the existing items from the old cart
//   const toggleCategory = (cat: string) =>
//     setSelectedCategories((prev) =>
//       prev.includes(cat) ? prev.filter((v) => v !== cat) : [...prev, cat]
//     );

//   const toggleTag = (tag: string) =>
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((v) => v !== tag) : [...prev, tag]
//     );

//   const toggleRating = (r: number) =>
//     setSelectedRatings((prev) =>
//       prev.includes(r) ? prev.filter((v) => v !== r) : [...prev, r]
//     );

//   const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);
//   const visibleTags = showAllTags ? allTags : allTags.slice(0, 6);

//   return (
//     <div className="mt-0 border rounded-xl p-4 shadow-md bg-white sticky top-2">
//       <h2 className="font-bold text-black text-xl mb-4 text-center">Filter Products</h2>
//       {/* --- Category Filter --- */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
//         <div className="flex flex-col gap-2">
//           {visibleCategories.map((cat) => (
//             <label key={cat} className="flex items-center gap-2 text-gray-700 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(cat)}
//                 onChange={() => toggleCategory(cat)}
//                 className="accent-blue-600"
//               />
//               <span>{cat}</span>
//             </label>
//           ))}
//         </div>
//         {allCategories.length > 6 && (
//           <button
//             onClick={() => setShowAllCategories((s) => !s)}
//             className="text-blue-600 text-sm mt-2"
//           >
//             {showAllCategories ? "See less" : "See more"}
//           </button>
//         )}
//       </div>

//       {/* --- Tags Filter --- */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
//         <div className="flex flex-col gap-2">
//           {visibleTags.map((tag, index) => (
//             <label key={`${tag}-${index}`} className="flex items-center gap-2 text-gray-700 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={selectedTags.includes(tag)}
//                 onChange={() => toggleTag(tag)}
//                 className="accent-blue-600"
//               />
//               <span>{tag}</span>
//             </label>
//           ))}
//         </div>
//         {allTags.length > 6 && (
//           <button
//             onClick={() => setShowAllTags((s) => !s)}
//             className="text-blue-600 text-sm mt-2"
//           >
//             {showAllTags ? "See less" : "See more"}
//           </button>
//         )}
//       </div>

//       {/* --- Ratings --- */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
//         {[1, 2, 3, 4, 5].map((r) => (
//           <label key={r} className="flex items-center space-x-2 mb-1 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={selectedRatings.includes(r)}
//               onChange={() => toggleRating(r)}
//               className="accent-blue-600"
//             />
//             <span>{"⭐".repeat(r)}</span>
//           </label>
//         ))}
//       </div>

//       {/* --- Price Range --- */}
//       <div>
//         <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
//         <input
//           type="range"
//           min="0"
//           max="2000"
//           step="50"
//           value={selectedPrice}
//           onChange={(e) => setSelectedPrice(Number(e.target.value))}
//           className="w-full accent-blue-600 cursor-pointer"
//         />
//         <p className="text-center text-gray-700 mt-1">
//           Up to <span className="text-blue-600 font-semibold">${selectedPrice}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

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

  // --- Unique filters ---
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

  // Helper
  const parseCommaList = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split(",").map((v) => v.trim()).filter(Boolean);
  };

  // States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(parseCommaList(category));
  const [selectedTags, setSelectedTags] = useState<string[]>(parseCommaList(tags));
  const [selectedRatings, setSelectedRatings] = useState<number[]>(ratings ?? []);
  const [selectedPrice, setSelectedPrice] = useState<number>(price);

  // Update URL
  useEffect(() => {
    const query: Record<string, string> = {};

    if (search) query.search = search;
    if (selectedCategories.length > 0) query.category = selectedCategories.join(",");
    if (selectedTags.length > 0) query.tags = selectedTags.join(",");
    if (selectedRatings.length > 0) query.rating = selectedRatings.join(",");
    if (selectedPrice !== 2000) query.price = String(selectedPrice);

    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    startTransition(() => {
      router.push(`/product?${queryString}`);
    });
  }, [selectedCategories, selectedTags, selectedRatings, selectedPrice, search, router]);

  // Toggle handlers
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
    if (type === "category")
      setSelectedCategories((prev) => prev.filter((v) => v !== value));

    if (type === "tag")
      setSelectedTags((prev) => prev.filter((v) => v !== value));

    if (type === "rating")
      setSelectedRatings((prev) => prev.filter((v) => v !== value));

    if (type === "price") setSelectedPrice(2000); // reset to max
  };

  const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 6);

  return (
    <div className="mt-0 border rounded-xl p-4 shadow-md bg-white sticky top-2">
      <h2 className="font-bold text-black text-xl mb-4 text-center">Filter Products</h2>

      {/* ====================== SELECTED FILTERS SECTION ====================== */}
      {(selectedCategories.length > 0 ||
        selectedTags.length > 0 ||
        selectedRatings.length > 0 ||
        selectedPrice !== 2000) && (
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
                  className="text-blue-700 hover:text-red-600 font-bold"
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
                  className="text-green-700 hover:text-red-600 font-bold"
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
                  className="text-yellow-700 hover:text-red-600 font-bold"
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
                  className="text-purple-700 hover:text-red-600 font-bold"
                >
                  ✕
                </button>
              </span>
            )}

          </div>
        </div>
      )}

      {/* ====================== CATEGORY FILTERS ====================== */}
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

      {/* ====================== TAGS FILTER ====================== */}
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

      {/* ====================== RATING FILTER ====================== */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
        {[1, 2, 3, 4, 5].map((r) => (
          <label key={r} className="flex items-center space-x-2 mb-1 cursor-pointer">
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

      {/* ====================== PRICE FILTER ====================== */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <p className="text-center text-gray-700 mt-1">
          Up to <span className="text-blue-600 font-semibold">${selectedPrice}</span>
        </p>
      </div>
    </div>
  );
}
