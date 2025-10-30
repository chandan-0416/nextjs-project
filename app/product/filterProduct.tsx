// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useMemo, useState } from "react";

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
//   const searchParams = useSearchParams();
//   const [showAllTags, setShowAllTags] = useState(false);

//   // ✅ Combine brand and category into unique tags
//   const allTags = useMemo(
//     () => Array.from(new Set(products.flatMap((p) => [p.brand, p.category]))),
//     [products]
//   );

//   // ✅ Helper to update query params in the URL
//   const updateParam = (key: string, value: string | string[] | number) => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (Array.isArray(value)) {
//       params.delete(key);
//       value.forEach((v) => params.append(key, String(v)));
//     } else {
//       if (value === "" || value === "All" || value === 2000) {
//         params.delete(key);
//       } else {
//         params.set(key, String(value));
//       }
//     }

//     router.push(`/product?${params.toString()}`);
//   };

//   // ✅ Toggle helper for checkbox-based filters
//   const toggleArrayParam = <T extends string | number>(
//     key: string,
//     current: T[],
//     value: T
//   ) => {
//     const updated = current.includes(value)
//       ? current.filter((v) => v !== value)
//       : [...current, value];
//     updateParam(key, updated.map(String));
//   };

//   // ✅ Show only 6 tags unless expanded
//   const visibleTags = showAllTags ? allTags : allTags.slice(0, 6);

//   return (
//     <div className="border rounded-xl p-4 shadow-md bg-white sticky top-4">
//       <h2 className="font-bold text-black text-xl mb-4 text-center">
//         Filter Products
//       </h2>

//       {/* 🔍 Search */}
//       <input
//         type="text"
//         placeholder="Search by title"
//         defaultValue={search}
//         onChange={(e) => updateParam("search", e.target.value)}
//         className="w-full border border-gray-400 rounded-lg px-3 py-2 mb-3 focus:ring focus:ring-blue-300"
//       />

//       {/* 📂 Category */}
//       <div className="mb-4">
//         <label className="font-semibold block mb-1 text-gray-800">
//           Category
//         </label>
//         <select
//           defaultValue={category}
//           onChange={(e) => updateParam("category", e.target.value)}
//           className="w-full border rounded p-2 text-gray-700"
//         >
//           <option>All</option>
//           {[...new Set(products.map((p) => p.category))].map((cat) => (
//             <option key={cat}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       {/* 🏷️ Tags - Multi Select with See More / See Less */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
//         <div className="flex flex-col gap-2">
//           {visibleTags.map((tag, index) => (
//             <label
//               key={`${tag}-${index}`}
//               className="flex items-center space-x-2 cursor-pointer text-gray-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={tags.includes(tag)}
//                 onChange={() => toggleArrayParam("tags", tags, tag)}
//                 className="accent-blue-600"
//               />
//               <span>{tag}</span>
//             </label>
//           ))}

//           {/* See more / See less button */}
//           {allTags.length > 6 && (
//             <button
//               type="button"
//               onClick={() => setShowAllTags((prev) => !prev)}
//               className="text-blue-600 text-sm mt-2 hover:underline self-start"
//             >
//               {showAllTags ? "See less" : "See more"}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ⭐ Rating */}
//       <div className="mb-4">
//         <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
//         {[1, 2, 3, 4, 5].map((r) => (
//           <label
//             key={r}
//             className="flex items-center space-x-2 mb-1 cursor-pointer"
//           >
//             <input
//               type="checkbox"
//               checked={ratings.includes(r)}
//               onChange={() => toggleArrayParam("rating", ratings, r)}
//               className="accent-blue-600"
//             />
//             <span>{"⭐".repeat(r)}</span>
//           </label>
//         ))}
//       </div>

//       {/* 💰 Price Range */}
//       <div>
//         <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
//         <input
//           type="range"
//           min="0"
//           max="2000"
//           step="50"
//           defaultValue={price}
//           onChange={(e) => updateParam("price", Number(e.target.value))}
//           className="w-full accent-blue-600 cursor-pointer"
//         />
//         <p className="text-center text-gray-700 mt-1">
//           Up to <span className="text-blue-600 font-semibold">${price}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
  import { startTransition } from "react";
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
  category: string; // incoming URL value, e.g. "phones,laptops" or "" 
  ratings: number[];
  tags: string[]; // incoming tags array (already parsed by parent)
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

  // Unique lists
  const allCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const allTags = useMemo(
    () => Array.from(new Set(products.flatMap((p) => [p.brand, p.category]))),
    [products]
  );

  // UI show more toggles
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // --- Local state for selected filters (so UI updates immediately) ---
  const parseCategoryProp = (c: string) => (c ? c.split(",").filter(Boolean) : []);
  const parseTagsProp = (t: string[] | undefined) => (Array.isArray(t) ? t : []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    parseCategoryProp(category)
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(parseTagsProp(tags));

  // keep local state in sync when parent props change (e.g., after navigation)
  useEffect(() => {
    setSelectedCategories(parseCategoryProp(category));
  }, [category]);

  useEffect(() => {
    setSelectedTags(parseTagsProp(tags));
  }, [tags]);

  // Helper to update URL query params
  const updateParam = (key: string, value: string | string[] | number) => {
  const params = new URLSearchParams(searchParams.toString());

  if (Array.isArray(value)) {
    params.delete(key);
    value.forEach((v) => params.append(key, String(v)));
  } else {
    if (value === "" || value === "All" || value === 2000) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  }

  // ✅ Use startTransition to avoid “update while rendering” error
  startTransition(() => {
    router.push(`/product?${params.toString()}`);
  });
};

  // Toggle handlers that update local state immediately, then update URL
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(cat) ? prev.filter((v) => v !== cat) : [...prev, cat];
      // push URL as comma-separated categories
      updateParam("category", updated.length ? updated.join(",") : "");
      return updated;
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const updated = prev.includes(tag) ? prev.filter((v) => v !== tag) : [...prev, tag];
      // update URL using repeated query param 'tags': ?tags=tag1&tags=tag2
      updateParam("tags", updated);
      return updated;
    });
  };

  const toggleRating = (r: number) => {
    // ratings come from props and we don't maintain local ratings state here (you can add if desired)
    // We'll build based on incoming ratings prop and then push updated value
    const current = ratings ?? [];
    const updated = current.includes(r) ? current.filter((v) => v !== r) : [...current, r];
    updateParam("rating", updated.map(String));
  };

  // Visible slices
  const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 6);

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white sticky top-4">
      <h2 className="font-bold text-black text-xl mb-4 text-center">Filter Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title"
        defaultValue={search}
        onChange={(e) => updateParam("search", e.target.value)}
        className="w-full border border-gray-400 rounded-lg px-3 py-2 mb-3 focus:ring focus:ring-blue-300"
      />

      {/* Category Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
        <div className="flex flex-col gap-2">
          {visibleCategories.map((cat, idx) => (
            <label
              key={`${cat}-${idx}`}
              className="flex items-center gap-2 text-gray-700 cursor-pointer"
            >
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

      {/* Tags Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Tags</h3>
        <div className="flex flex-col gap-2">
          {visibleTags.map((tag, idx) => (
            <label key={`${tag}-${idx}`} className="flex items-center gap-2 text-gray-700 cursor-pointer">
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
          <button onClick={() => setShowAllTags((s) => !s)} className="text-blue-600 text-sm mt-2">
            {showAllTags ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* Rating Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Rating</h3>
        {[1, 2, 3, 4, 5].map((r) => (
          <label key={r} className="flex items-center space-x-2 mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={ratings.includes(r)}
              onChange={() => toggleRating(r)}
              className="accent-blue-600"
            />
            <span>{"⭐".repeat(r)}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
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
