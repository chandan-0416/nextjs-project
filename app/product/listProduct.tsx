"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltertheProduct from "./filterProduct";
import Image from "next/image";
import Link from "next/link";

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

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const productsPerPage = 15;
  const currentPage = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const price = Number(searchParams.get("price") || 2000);

  const categories = useMemo(
    () =>
      categoryParam
        .split(",")
        .filter(Boolean)
        .map((c) => c.trim()),
    [categoryParam]
  );

  const ratings = useMemo(
    () => searchParams.getAll("rating").map((r) => Number(r)),
    [searchParams]
  );

  const tags = useMemo(() => searchParams.getAll("tags"), [searchParams]);

  // Fetch product data once
  useEffect(() => {
    async function loadData() {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setProducts(data.products);
    }
    loadData();
  }, []);

  // ✅ Filtering logic
  useEffect(() => {
    if (products.length === 0) return;

    const filtered = products.filter((p) => {
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

    setFilteredProducts(filtered);
  }, [products, search, categories, ratings, tags, price]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle pagination click
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  // Generate visible page numbers dynamically
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // number of visible buttons (before truncating)
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = generatePageNumbers();

  return (
    <div className="mt-28 flex flex-col md:flex-row px-6 gap-6 mb-10">
      {/* Sidebar Filters */}
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
            ))
          ) : (
            <p className="text-gray-600 text-center mt-10">
              No products match your filters.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            {/* First Page Button */}
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                First
              </button>
            )}

            {/* Previous */}
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg ${currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md ${currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg ${currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Next
            </button>

            {/* Last Page Button */}
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
    </div>
  );
}
