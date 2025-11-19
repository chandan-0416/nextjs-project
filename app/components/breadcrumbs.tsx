// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// // ---- Types ----
// type Product = {
//   id: number;
//   title: string;
//   category: string;
// };

// // ---- Breadcrumb Component ----
// export default function Breadcrumbs() {
//   const pathname = usePathname();
//   const [product, setProduct] = useState<Product | null>(null);

//   if (!pathname) return null;

//   const segments = pathname.split("/").filter(Boolean);

//   // --- Page Conditions ---
//   const isCartPage = pathname === "/cart";
//   const isCheckoutPage = pathname === "/checkoutPage";

//   const isProductDetail =
//     segments[0] === "detailPage" && segments.length === 2;

//   const productId = isProductDetail ? segments[1] : null;

//   // ⭐ Fetch product info ONLY on detail page
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     if (!productId) return;

//     async function fetchProduct() {
//       try {
//         const res = await fetch(
//           `https://dummyjson.com/products/${productId}`
//         );
//         const data = await res.json();
//         setProduct({
//           id: data.id,
//           title: data.title,
//           category: data.category,
//         });
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     }

//     fetchProduct();
//   }, [productId]);

//   const crumbs: { label: string; href: string | null }[] = [
//     { label: "Home", href: "/" },
//   ];

//   // ⭐ ALWAYS show Products link (just like your original logic)
//   crumbs.push({ label: "Products", href: "/product" });

//   // ⭐ PRODUCT DETAIL PAGE
//   if (isProductDetail) {
//     if (product?.category) {
//       crumbs.push({
//         label: product.category,
//         href: `/product?category=${product.category}`,
//       });
//     }

//     crumbs.push({
//       label: product ? product.title : "Loading...",
//       href: null,
//     });
//   }

//   // ⭐ CART PAGE
//   if (isCartPage) {
//     crumbs.push({
//       label: "Cart",
//       href: null,
//     });
//   }

//   // ⭐ CHECKOUT PAGE
//   if (isCheckoutPage) {
//     crumbs.push({ label: "Cart", href: "/cart" });
//     crumbs.push({ label: "Checkout", href: null });
//   }

//   return (
//     <>
//       {/* Breadcrumb UI */}
//       <nav aria-label="breadcrumb" className="text-sm my-4">
//         <ol className="flex items-center gap-2 flex-wrap">
//           {crumbs.map((c, index) => (
//             <li key={index} className="flex items-center gap-2">
//               {index > 0 && <span>/</span>}

//               {c.href ? (
//                 <Link
//                   href={c.href}
//                   className="text-blue-600 hover:underline capitalize"
//                 >
//                   {c.label}
//                 </Link>
//               ) : (
//                 <span className="text-gray-700 font-medium capitalize">
//                   {c.label}
//                 </span>
//               )}
//             </li>
//           ))}
//         </ol>
//       </nav>

//       {/* ⭐ SEO STRUCTURED DATA for Google */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BreadcrumbList",
//             itemListElement: crumbs.map((c, i) => ({
//               "@type": "ListItem",
//               position: i + 1,
//               name: c.label,
//               item: c.href ? `https://your-domain.com${c.href}` : undefined,
//             })),
//           }),
//         }}
//       />
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// ---- Types ----
type Product = {
  id: number;
  title: string;
  category: string;
};

// ---- Breadcrumb Component ----
export default function Breadcrumbs() {
  const pathname = usePathname();
  const [product, setProduct] = useState<Product | null>(null);

  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  // --- Page Conditions ---
  const isCartPage = pathname === "/cart";
  const isCheckoutPage = pathname === "/checkoutPage";

  const isProductDetail =
    segments[0] === "detailPage" && segments.length === 2;

  const productId = isProductDetail ? segments[1] : null;

  // ⭐ Fetch product info ONLY on detail page
      // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!productId) return;

    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        const data = await res.json();
        setProduct({
          id: data.id,
          title: data.title,
          category: data.category,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [productId]);

  const crumbs: { label: string; href: string | null }[] = [
    { label: "Home", href: "/" },
  ];

  // ⭐ ALWAYS show Products link (based on your logic)
  crumbs.push({ label: "Products", href: "/product" });

  // ⭐ PRODUCT DETAIL PAGE
  if (isProductDetail) {
    if (product?.category) {
      crumbs.push({
        label: product.category,
        href: `/product?category=${product.category}`,
      });
    }

    crumbs.push({
      label: product ? product.title : "Loading...",
      href: null,
    });
  }

  // ⭐ CART PAGE
  if (isCartPage) {
    crumbs.push({
      label: "Cart",
      href: null,
    });
  }

  // ⭐ CHECKOUT PAGE
  if (isCheckoutPage) {
    crumbs.push({ label: "Cart", href: "/cart" });
    crumbs.push({ label: "Checkout", href: null });
  }

  return (
    <>
      {/* Breadcrumb UI */}
      <nav aria-label="breadcrumb" className="text-sm my-4">
        <ol className="flex items-center gap-2 flex-wrap">
          {crumbs.map((c, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}

              {c.href ? (
                <Link
                  href={c.href}
                  className="text-blue-600 hover:underline capitalize"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-gray-700 font-medium capitalize">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* ⭐ SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              item: c.href ? `https://your-domain.com${c.href}` : undefined,
            })),
          }),
        }}
      />
    </>
  );
}
