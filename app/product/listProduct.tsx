"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import FiltertheProduct from "./filterProduct";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { useCart } from "../context/CartContext";

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
  const { cartItems, addToCart } = useCart();
  const productsPerPage = 9;
  const currentPage = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const price = Number(searchParams.get("price") || 2000);
  const sort = searchParams.get("sort") as "low" | "high" | null;

  const categories = useMemo(
    () => categoryParam.split(",").map((c) => c.trim()).filter(Boolean),
    [categoryParam]
  );

  const ratings = useMemo(
    () => searchParams.getAll("rating").map((r) => Number(r)).filter(Boolean),
    [searchParams]
  );

  const tags = useMemo(() => searchParams.getAll("tags"), [searchParams]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchTitle = !q || p.title.toLowerCase().includes(q);
      const matchCategory = categories.length === 0 || categories.includes(p.category);
      const matchRating = ratings.length === 0 || ratings.includes(Math.round(p.rating));
      const matchPrice = p.price <= price;
      const matchTags = tags.length === 0 || tags.some((t) => t === p.brand || t === p.category);
      return matchTitle && matchCategory && matchRating && matchPrice && matchTags;
    });
  }, [products, search, categories, ratings, tags, price]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    if (!sort) return filteredProducts;
    const sorted = [...filteredProducts];
    if (sort === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  const pushWithParams = (params: URLSearchParams) => {
    const qs = params.toString();
    const url = qs ? `?${qs}` : ".";
    router.push(url);
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch { }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    pushWithParams(params);
  };

  // Visible pagination pages
  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);


  return (
    <div className="-mt-14 ">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* MAIN Layout */}
      <div className="flex flex-col md:flex-row gap-1 mt-16 ">

        {/* Sidebar (Filters) */}
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <FiltertheProduct
            products={products}
            search={search}
            category={categoryParam}
            ratings={ratings}
            tags={tags}
            price={price}
            sort={sort ?? undefined}
          />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              gap-6 
              transition-all 
              duration-200
            "
            key={currentPage}
          >
            {currentProducts.map((product) => (
              <div
                key={product.id}

                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
              {/** click on card */}
                <div onClick={() => {
                  router.push(`/detailPage/${product.id}`);
                }}>

                  <div className="w-full h-48 relative mb-3">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover rounded-md"
                      unoptimized
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-indigo-600 font-semibold">${product.price}</p>
                    <p className="text-yellow-500">⭐ {product.rating.toFixed(1)}</p>
                  </div>
                    <p className="text-sm text-gray-400 mt-1">{product.category}</p>
                </div>
                   {/** click on add to card */}
                <button
                  className="bg-black text-white shadow-2xl"
                  onClick={() => {
                    const existingItem = cartItems.find((item) => item.id === product.id);

                    if (existingItem) {
                      alert("This product is already in your cart!")
                    //  addToCart({ ...product, quantity: existingItem.quantity + 1 });
                    
                    } else {
                      addToCart({ ...product, quantity: 1 }); // add new product
                        router.push("/cart");
                    }
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}

            {currentProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500  m-24">
                No products match your filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  First
                </button>
              )}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1
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
                  className={`px-4 py-2 rounded-md ${page === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Next
              </button>

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Last
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
