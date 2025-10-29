"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltertheProduct from "./filterProduct";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const productsPerPage = 9;
  const currentPage = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const price = Number(searchParams.get("price") || 2000);

  // ✅ Memoize arrays to prevent infinite re-renders
  const ratings = useMemo(
    () => searchParams.getAll("rating").map((r) => Number(r)),
    [searchParams]
  );
  const tags = useMemo(
    () => searchParams.getAll("tags"),
    [searchParams]
  );

  useEffect(() => {
    async function loadData() {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setProducts(data.products);
    }
    loadData();
  }, []);

  // ✅ Filter only when stable dependencies change
  useEffect(() => {
    const filtered = products.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      const matchRating =
        ratings.length === 0 || ratings.includes(Math.round(p.rating));
      const matchPrice = p.price <= price;
      const matchTags =
        tags.length === 0 || tags.some((t) => t === p.brand || t === p.category);
      return matchTitle && matchCategory && matchRating && matchPrice && matchTags;
    });

    setFilteredProducts(filtered);
  }, [products, search, category, ratings, tags, price]);


  // 🧮 Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // 🔗 Handle page change (updates URL)
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row mt-10 px-6 gap-6 mb-10">
      {/* 🧰 Filter Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <Suspense fallback={<p>Loading Filters...</p>}>
          <FiltertheProduct
            products={products}
            search={search}
            category={category}
            ratings={ratings}
            tags={tags}
            price={price}
          />
        </Suspense>
      </aside>

      {/* 🛍️ Products Grid */}
      <main className="flex-1">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link
                href={`/detailPage/${product.id}`}
                key={product.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-md mb-3"
                  unoptimized
                />
                <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-semibold mt-2">${product.price}</p>
                <p className="text-yellow-500">⭐ {product.rating}</p>
                <p className="text-sm text-gray-400">{product.category}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 text-center mt-10">
              No products match your filters.
            </p>
          )}
        </div>

        {/* 🧭 Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
