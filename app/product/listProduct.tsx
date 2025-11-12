"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import FiltertheProduct from "./filterProduct";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  rating: number;
};

export default function ProductsGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productsPerPage = 15;
  const currentPage = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const price = Number(searchParams.get("price") || 2000);

  const categories = useMemo(
    () => categoryParam.split(",").filter(Boolean).map((c) => c.trim()),
    [categoryParam]
  );

  const ratings = useMemo(
    () => searchParams.getAll("rating").map((r) => Number(r)),
    [searchParams]
  );

  const tags = useMemo(() => searchParams.getAll("tags"), [searchParams]);

  // ✅ Filtering logic (client side)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        categories.length === 0 || categories.includes(p.category);
      const matchRating =
        ratings.length === 0 || ratings.includes(Math.round(p.rating));
      const matchPrice = p.price <= price;
      const matchTags =
        tags.length === 0 || tags.some((t) => t === p.brand || t === p.category);

      return matchTitle && matchCategory && matchRating && matchPrice && matchTags;
    });
  }, [products, search, categories, ratings, tags, price]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visiblePages = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <>
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <FiltertheProduct
          products={products}
          search={search}
          category={categoryParam}
          ratings={ratings}
          tags={tags}
          price={price}
        />
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300"
          key={currentPage}
        >
          {currentProducts.map((product) => (
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
              <h2 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="text-indigo-600 font-semibold mt-2">
                ${product.price}
              </p>
              <p className="text-yellow-500">⭐ {product.rating}</p>
              <p className="text-sm text-gray-400">{product.category}</p>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                First
              </button>
            )}
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Prev
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Last
              </button>
            )}
          </div>
        )}
      </main>
    </>
  );
}